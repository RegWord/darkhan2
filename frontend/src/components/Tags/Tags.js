import React from 'react';
import { Link } from 'react-router-dom';
import classes from './tags.module.css';

export default function Tags({ tags = [] , forFoodPage }) {
  console.log("Tags received:", tags); // Логируем, что реально приходит

  if (!Array.isArray(tags)) {
    return <p>Ошибка: теги не загружены</p>; // Безопасный вывод ошибки
  }

  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
      }}
    >
      {tags.length > 0 ? (
        tags.map(tag => (
          <Link key={tag.name} to={`/tag/${tag.name}`}>
            {tag.name}
            {!forFoodPage && `(${tag.count})`}
          </Link>
        ))
      ) : (
        <p>Нет тегов</p>
      )}
    </div>
  );
}
