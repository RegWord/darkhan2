import React from 'react';
import { Link } from 'react-router-dom';
import classes from './tags.module.css';

export default function Tags({ tags = [], forFoodPage }) {
  // Лог для проверки данных
  console.log("Tags received:", tags);

  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFoodPage ? 'start' : 'center',
      }}
    >
      {Array.isArray(tags) && tags.length > 0 ? (
        tags.map(tag => (
          <Link key={tag.name} to={`/tag/${tag.name}`}>
            {tag.name}
            {!forFoodPage && `(${tag.count})`}
          </Link>
        ))
      ) : (
        <p>Нет тегов</p> // Можно заменить на `null`, если не нужно сообщение
      )}
    </div>
  );
}
