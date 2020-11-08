import React from 'react';
import { DateTime, Duration } from 'luxon';
import styles from './Flight.module.css';

const Flight = ({ flight }) => {
  const {
    origin, destination, date, duration, stops,
  } = flight;
  const dataStart = DateTime.fromISO(date);
  const msInMinute = 60 * 1000;
  const dataDuration = Duration.fromMillis(duration * msInMinute);
  const dataEnd = dataStart.plus(dataDuration);
  const formatTime = `${dataStart.toFormat("hh':'mm")} - ${dataEnd.toFormat("hh':'mm")}`;
  const formatTimeLocale = dataDuration.toFormat("hh'ч 'mm'м'");
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <div className={styles.title}>{`${origin} - ${destination}`}</div>
        <div className={styles.content}>{formatTime}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.title}>В ПУТИ</div>
        <div className={styles.content}>{formatTimeLocale}</div>
      </div>
      <div className={styles.column}>
        <div className={styles.title}>{`${stops.length} ПЕРЕСАДКИ`}</div>
        <div className={styles.content}>{stops.join(',')}</div>
      </div>
    </div>
  );
};

export default Flight;
