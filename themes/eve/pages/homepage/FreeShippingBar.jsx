import React, { useState, useMemo } from 'react';
import { createClient, Provider, useQuery } from 'urql';
import CartAddToCartButton from './CartAddToCartButton';

const client = createClient({
  url: '/api/graphql'
});

const CategoriesQuery = `
  query {
    categories(filters: [{key: "limit", operation: eq, value: "1000"}]) {
      items {
        categoryId
        name
        urlKey
        parent {
          categoryId
          name
        }
      }
    }
  }
`;

const BrandsQuery = `
  query {
    collections(filters: [{key: "limit", operation: eq, value: "1000"}])  {
      items {
        collectionId
        name
      }
    }
  }
`;

const ProductsQuery = `
  query {
    products(filters: [{key: "limit", operation: eq, value: "10000"}])  {
      items {
        productId
        name
        urlKey
        image { url }
        category { categoryId name }
        collections { collectionId name }
        price {
          regular { value text }
          special { value text }
        }
        sku
      }
    }
  }
`;

function CategoryProductBlock() {
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Категории
  const [catResult] = useQuery({ query: CategoriesQuery });
  const { data: catData, fetching: catLoading, error: catError } = catResult;

  // Бренды (collections)
  const [brandResult] = useQuery({ query: BrandsQuery });
  const { data: brandData, fetching: brandLoading, error: brandError } = brandResult;

  // Все товары
  const [prodResult] = useQuery({ query: ProductsQuery });
  const { data: prodData, fetching: prodLoading, error: prodError } = prodResult;
  function getProductUrl(product, categories) {
  if (!product.category || !categories) return `/product/${product.urlKey}`;

  const productCategory = categories.find(cat => cat.categoryId === product.category.categoryId);

  if (!productCategory) {
    console.warn('Категория товара не найдена:', product);
    return `/product/${product.urlKey}`;
  }

  let mainCategory = productCategory;
  let subCategory = null;

  if (productCategory.parent) {
    mainCategory = categories.find(cat => cat.categoryId === productCategory.parent.categoryId) || productCategory;
    subCategory = productCategory;
  }

  let url = `/${mainCategory.urlKey ?? 'unknown'}`;
  if (subCategory) {
    url += `/${subCategory.urlKey ?? 'unknown'}`;
  }
  url += `/${product.urlKey}`;
  return url;
}


  // При первой загрузке выбираем первую главную категорию
  React.useEffect(() => {
    if (
      !selectedMainCategory &&
      catData?.categories?.items?.length > 0
    ) {
      const firstMain = catData.categories.items.find((cat) => !cat.parent);
      setSelectedMainCategory(firstMain);
      setSelectedSubCategory(null);
    }
  }, [catData, selectedMainCategory]);

  // Список подкатегорий для выбранной главной
  const subCategories = useMemo(() => {
    if (!catData?.categories?.items || !selectedMainCategory) return [];
    return catData.categories.items.filter(
      (cat) =>
        cat.parent &&
        cat.parent.categoryId === selectedMainCategory.categoryId
    );
  }, [catData, selectedMainCategory]);

  // Главные категории
  const mainCategories = useMemo(() => {
    if (!catData?.categories?.items) return [];
    return catData.categories.items.filter((cat) => !cat.parent);
  }, [catData]);

  // Для фильтрации всех товаров по главной + её подкатегориям
  const mainCatAndSubIds = useMemo(() => {
    if (!catData?.categories?.items || !selectedMainCategory) return [];
    const subcatIds = catData.categories.items
      .filter(
        (cat) =>
          cat.parent &&
          cat.parent.categoryId === selectedMainCategory.categoryId
      )
      .map((cat) => cat.categoryId);
    return [selectedMainCategory.categoryId, ...subcatIds];
  }, [catData, selectedMainCategory]);

  // Фильтрация по категории/подкатегории/бренду
  const filteredProducts = useMemo(() => {
    if (!prodData?.products?.items) return [];
    let result = prodData.products.items;
    if (selectedSubCategory) {
      result = result.filter(
        (product) =>
          product.category &&
          product.category.categoryId === selectedSubCategory.categoryId
      );
    } else if (selectedMainCategory) {
      result = result.filter(
        (product) =>
          product.category &&
          mainCatAndSubIds.includes(product.category.categoryId)
      );
    }
    if (selectedBrand) {
      result = result.filter(
        (product) =>
          product.collections &&
          product.collections.some(
            (c) => c.collectionId === selectedBrand.collectionId
          )
      );
    }
    return result;
  }, [
    prodData,
    selectedMainCategory,
    selectedSubCategory,
    selectedBrand,
    mainCatAndSubIds,
  ]);

  return (
    <div className="brutal-cpb__bg">
      <div className="brutal-cpb__container">
        <aside className="brutal-cpb__sidebar">
  <h3 style={{paddingBottom: 10, textAlign: 'center'}}>Категории</h3>
{catLoading ? (
  <p>Загрузка...</p>
) : catError ? (
  <p>Ошибка: {catError.message}</p>
) : (
  <ul>
  {catData.categories.items
    .filter((cat) => !cat.parent)
    .map((cat) => (
      <React.Fragment key={cat.categoryId}>
        <li
  onClick={() => {
    if (selectedMainCategory?.categoryId !== cat.categoryId) {
      // Выбрали новую главную категорию
      setSelectedMainCategory(cat);
      setSelectedSubCategory(null);
    } else if (selectedSubCategory) {
      // Клик по уже выбранной главной и есть выбранная подкатегория
      setSelectedSubCategory(null);
    }
    // Если клик по выбранной главной и подкатегория не выбрана — ничего не делаем
  }}
  className={`brutal-cpb__cat ${
    selectedMainCategory?.categoryId === cat.categoryId
      ? 'brutal-cpb__cat--active'
      : ''
  }`}
  style={{cursor: 'pointer'}}
>
  {cat.name}
</li>

        {/* Подкатегории — только под выбранной */}
        {selectedMainCategory?.categoryId === cat.categoryId && (
          <ul style={{paddingLeft: 22, margin: 0}}>
            {catData.categories.items
              .filter(
                (subcat) =>
                  subcat.parent &&
                  subcat.parent.categoryId === cat.categoryId
              )
              .map((subcat) => (
                <li
                  key={subcat.categoryId}
                  onClick={(e) => {
                    e.stopPropagation();
                    // здесь важна именно проверка по id!
                    setSelectedSubCategory(
                      selectedSubCategory?.categoryId === subcat.categoryId
                        ? null // снимаем выбор, если клик по выбранной
                        : subcat
                    );
                  }}
                  className={`brutal-cpb__cat ${
                    selectedSubCategory?.categoryId === subcat.categoryId
                      ? 'brutal-cpb__cat--active'
                      : ''
                  }`}
                >
                  {subcat.name}
                </li>
              ))}
          </ul>
        )}
      </React.Fragment>
    ))}
</ul>

)}



          <hr style={{ border: 'none', borderTop: '1px solid #232325', margin: '18px 0 12px 0' }} />
          <h3 style={{paddingBottom: 10, textAlign: 'center'}}>Бренды</h3>
          {brandLoading ? (
            <p>Загрузка...</p>
          ) : brandError ? (
            <p>Ошибка: {brandError.message}</p>
          ) : (
            <ul>
              <li
                onClick={() => setSelectedBrand(null)}
                className={!selectedBrand ? 'brutal-cpb__cat brutal-cpb__cat--active' : 'brutal-cpb__cat'}
                style={{ fontStyle: 'italic', color: '#aaa' }}
              >
                Все бренды
              </li>
              {brandData.collections.items.map((brand) => (
                <li
                  key={brand.collectionId}
                  onClick={() => setSelectedBrand(brand)}
                  className={`brutal-cpb__cat ${selectedBrand?.collectionId === brand.collectionId ? 'brutal-cpb__cat--active' : ''}`}
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          )}
        </aside>
        <main className="brutal-cpb__main">
          {prodLoading ? (
            <p>Загрузка товаров...</p>
          ) : prodError ? (
            <p>Ошибка: {prodError.message}</p>
          ) : (
            <div className="brutal-cpb__grid">
              {filteredProducts.map((product) => {
                const hasDiscount =
                  product.price.special.value > 0 &&
                  product.price.special.value < product.price.regular.value;
                return (
                  <div key={product.productId} className="brutal-cpb__card">
                    <div className="brutal-cpb__imgwrap">
                      {product.image?.url ? (
                        <img src={product.image.url} alt={product.name} className="brutal-cpb__img" />
                      ) : (
                        <div className="brutal-cpb__noimg">Нет фото</div>
                      )}
                      {hasDiscount && (
                        <div className="brutal-cpb__badge">SALE</div>
                      )}
                    </div>
                    <p className="brutal-cpb__name">{product.name}</p>
                    <div className="brutal-cpb__price-wrap">
                      {hasDiscount ? (
                        <>
                          <span className="brutal-cpb__price--old">{product.price.regular.text}</span>
                          <span className="brutal-cpb__price--new">{product.price.special.text}</span>
                        </>
                      ) : (
                        <span className="brutal-cpb__price--reg">{product.price.regular.text}</span>
                      )}
                    </div>
                    <div className="brutal-cpb__btns">
  <CartAddToCartButton product={product} />
  
  <a href={
    catData?.categories?.items
      ? getProductUrl(product, catData.categories.items)
      : `/product/${product.urlKey}`
  }className="brutal-cpb__more">
    Подробнее
  </a>
</div>

                  </div>
                );
              })}
              {!filteredProducts.length && !prodLoading && (
                <div className="brutal-cpb__empty">Нет товаров под выбранные фильтры</div>
              )}
            </div>
          )}
        </main>
      <style>{`
      .brutal-cpb__bg {
  background: #17181a;
  min-height: 100vh;
  color: #ececec;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  display: flex;
  justify-content: center;
}

.brutal-cpb__container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: #18181c;
  box-shadow: 0 2px 24px 0 #000a;
  border-radius: 22px;
  margin: 36px auto;
  min-height: 80vh;
  overflow: hidden;
  flex: 1 1 auto;
}

.brutal-cpb__sidebar {
  width: 320px;
  min-width: 210px;
  background: #18181a;
  border-right: 2px solid #212125;
  padding: 32px 18px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
}

.brutal-cpb__sidebar h3 {
  font-size: 1.12rem;
  font-weight: 700;
  color: #e0e0e0;
  letter-spacing: 0.5px;
  margin: 0 0 10px 0;
  text-transform: uppercase;
}

.brutal-cpb__cat {
  font-size: 1.01rem;
  padding: 10px 12px;
  border-radius: 7px;
  margin-bottom: 3px;
  cursor: pointer;
  background: none;
  color: #b8b8bb;
  border-left: 3px solid transparent;
  transition: background 0.14s, color 0.14s;
  user-select: none;
}

.brutal-cpb__cat:hover,
.brutal-cpb__cat--active {
  background: #212125;
  color: #fff;
  border-left: 3px solid #adadad;
  font-weight: 600;
}

.brutal-cpb__main {
  flex: 1;
  padding: 38px 36px 38px 36px;
  min-width: 0;
  background: #19191c;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brutal-cpb__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(255px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  justify-content: center;
}

@media (max-width: 1020px) {
  .brutal-cpb__container {
    flex-direction: column;
    max-width: 100vw;
    border-radius: 0;
    margin: 0;
    box-shadow: none;
    min-height: unset;
  }
  .brutal-cpb__sidebar {
    width: 100%;
    min-width: 0;
    border-right: none;
    border-bottom: 2px solid #232325;
    padding: 20px 10px 10px 10px;
    flex-direction: row;
    gap: 36px;
    justify-content: flex-start;
    align-items: flex-start;
    overflow-x: auto;
    border-radius: 0;
  }
  .brutal-cpb__main {
    padding: 22px 2vw 24px 2vw;
  }
  .brutal-cpb__grid {
    gap: 18px;
    max-width: 100vw;
  }
}

@media (max-width: 650px) {
  .brutal-cpb__container {
    flex-direction: column;
    max-width: 100vw;
    margin: 0;
  }
  .brutal-cpb__sidebar {
    padding: 11px 3vw 8px 3vw;
    gap: 10px;
    font-size: 0.97rem;
    flex-direction: column;
    border-bottom: 1px solid #212125;
    border-right: none;
    align-items: stretch;
  }
  .brutal-cpb__main {
    padding: 10px 2vw 15px 2vw;
  }
  .brutal-cpb__grid {
    grid-template-columns: 1fr;
    gap: 15px;
    max-width: 99vw;
  }
}

.brutal-cpb__card {
  background: #1c1c20;
  border-radius: 13px;
  box-shadow: 0 2px 10px #000b;
  padding: 19px 15px 14px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.16s;
  position: relative;
  min-height: 280px;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
}

.brutal-cpb__card:hover {
  box-shadow: 0 4px 18px #000d;
}

.brutal-cpb__imgwrap {
  width: 116px;
  height: 116px;
  border-radius: 10px;
  background: #19191a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border: 2px solid #222;
  overflow: hidden;
  position: relative;
}

.brutal-cpb__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(0.8);
}

.brutal-cpb__noimg {
  width: 100%;
  height: 100%;
  color: #767676;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.97rem;
  background: #232325;
}

.brutal-cpb__badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #19191a;
  color: #ff6161;
  font-size: 0.88rem;
  font-weight: 700;
  border-radius: 4px;
  padding: 2px 10px;
  letter-spacing: 1.3px;
  box-shadow: 0 2px 8px #1114;
  text-transform: uppercase;
}

.brutal-cpb__name {
  font-size: 1.01rem;
  color: #ebebeb;
  font-weight: 700;
  margin: 2px 0 10px 0;
  text-align: center;
  letter-spacing: 0.6px;
  min-height: 38px;
}

.brutal-cpb__price-wrap {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 13px;
}

.brutal-cpb__price--old {
  color: #6e6e6e;
  font-size: 0.96rem;
  text-decoration: line-through;
  opacity: 0.7;
}

.brutal-cpb__price--new {
  color: #e46060;
  font-size: 1.11rem;
  font-weight: 700;
}

.brutal-cpb__price--reg {
  color: #d4d4d4;
  font-size: 1.08rem;
  font-weight: 600;
}

.brutal-cpb__btns {
  display: flex;
  gap: 8px;
  margin-top: auto;
  width: 100%;
  justify-content: center;
}

.brutal-cpb__more {
  background: #202124;
  color: #c6c6c6;
  font-size: 0.95rem;
  padding: 7px 16px;
  border-radius: 6px;
  border: none;
  text-decoration: none;
  transition: background 0.13s, color 0.13s;
  letter-spacing: 0.6px;
  font-weight: 700;
}

.brutal-cpb__more:hover {
  background: #24252c;
  color: #fff;
}

.brutal-cpb__empty {
  color: #888;
  font-size: 1.03rem;
  text-align: center;
  margin: 30px auto;
  background: #19191d;
  border-radius: 9px;
  padding: 18px 7px;
  border: 1px dashed #232325;
  width: 96%;
  max-width: 420px;
}

hr {
  border: none;
  border-top: 1px solid #212125;
  margin: 16px 0 10px 0;
}


      `}</style>
    </div>
    </div>
  );
}

function FreeShippingBar() {
  return (
    <Provider value={client}>
      <CategoryProductBlock />
    </Provider>
  );
}

export default FreeShippingBar;

export const layout = {
  areaId: "content",
  sortOrder: 2,
};
