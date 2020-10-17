import React from 'react';
import { DateTime, Duration } from 'luxon';
import css from './Flight.module.css';

const Flight = ({ flight }) => {
  console.log('Flight -> flight', flight);
  const {
    origin, destination, date, duration, stops
  } = flight;
  const dataStart = DateTime.fromISO(date);
  const msInMinute = 60 * 1000;
  const dataDuration = Duration.fromMillis(duration * msInMinute);
  const dataEnd = dataStart.plus(dataDuration);
  const formatTime = `${dataStart.toFormat("hh':'mm")} - ${dataEnd.toFormat("hh':'mm")}`;
  const formatTimeLocale = dataDuration.toFormat("hh'ч 'mm'м'");
  return (
    <div className={css.row}>
      <div className={css.column}>
        <div className={css.title}>{`${origin} - ${destination}`}</div>
        <div className={css.content}>{formatTime}</div>
      </div>
      <div className={css.column}>
        <div className={css.title}>В ПУТИ</div>
        <div className={css.content}>{formatTimeLocale}</div>
      </div>
      <div className={css.column}>
        <div className={css.title}>{`${stops.length} ПЕРЕСАДКИ`}</div>
        <div className={css.content}>{stops.join(',')}</div>
      </div>
    </div>
  );
};

export default Flight;
