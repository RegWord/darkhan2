import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import classes from './thumbnails.module.css';

export default function Thumbnails({ foods = [] }) {
  console.log("Foods received:", foods); // Проверяем входные данные

  if (!Array.isArray(foods)) {
    return <p>Ошибка: данные не загружены</p>;
  }

  return (
    <ul className={classes.list}>
      {foods.length > 0 ? (
        foods.map(food => (
          <li key={food.id}>
            <Link to={`/food/${food.id}`}>
              <img
                className={classes.image}
                src={`${food.imageUrl}`}
                alt={food.name}
              />
              <div className={classes.content}>
                <div className={classes.name}>{food.name}</div>
                <span
                  className={`${classes.favorite} ${
                    food.favorite ? '' : classes.not
                  }`}
                >
                  ❤
                </span>
                <div className={classes.stars}>
                  <StarRating stars={food.stars} />
                </div>
                <div className={classes.product_item_footer}>
                  <div className={classes.origins}>
                    {Array.isArray(food.origins) ? (
                      food.origins.map(origin => (
                        <span key={origin}>{origin}</span>
                      ))
                    ) : (
                      <span>Нет данных</span>
                    )}
                  </div>
                  <div className={classes.cook_time}>
                    <span>🕒</span>
                    {food.cookTime}
                  </div>
                </div>
                <div className={classes.price}>
                  <Price price={food.price} />
                </div>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <p>Нет доступных блюд</p>
      )}
    </ul>
  );
}
