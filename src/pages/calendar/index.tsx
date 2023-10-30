import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/calendar/calendar.module.scss';
import * as constants from 'utils/constants';

type DayType = { type: "normal" | "last" | "next", content: string }

const Calendar: NextPage = () => {

    let currentDate = new Date();
    const [date, setDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth()));
    const [days, setDays] = useState<DayType[]>([]);

    useEffect(() => {
        console.log(date)
        let newDate = new Date(date);
        newDate.setDate(1);
        setDate(newDate);

        function renderCalendar() {
            const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); //tamam
            const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
            const firstDayIndex = date.getDay() - 1; //tamam
            const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
            const nextDays = 7 - lastDayIndex;

            let willpush: DayType[] = [];

            for (let x = firstDayIndex; x > 0; x--) {
                willpush.push({
                    type: 'last',
                    content: `${prevLastDay - x + 1}`
                })
            }

            for (let i = 1; i <= lastDay; i++) {
                willpush.push({
                    type: 'normal',
                    content: `${i}`
                })
            }
            for (let j = 1; j <= nextDays; j++) {
                willpush.push({
                    type: 'next',
                    content: `${j}`
                })
            }

            setDays(willpush);
        }

        renderCalendar();
    }, []);

    return (
        <>
            <Head>
                <title>lechixy | calendar!</title>
            </Head>
            <div className={styles.main}>
                <div className={styles.calendar_container}>
                    <div className={styles.calendar}>
                        <div className={styles.calendar_header}>
                            <h1>{`${constants.months[date.getMonth()]} ${date.getFullYear()}`}</h1>
                            <div className={styles.calendar_body_weekdays}>
                                {constants.days.map((day, index) => {
                                    return (
                                        <div key={`${day}-${index}`}>{day}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.calendar_body}>
                            <div className={styles.calendar_body_days}>
                                {days.map((day, index) => {
                                    let classes: string[] = [
                                        `${styles.day}`
                                    ];
                                    day.type === "last" ?
                                        classes.push(styles.last_day) : day.type === "next" ?
                                            classes.push(styles.next_day) : classes.push(styles.normal);

                                    if (new Date().getDate() === parseInt(day.content) && new Date().getMonth() === date.getMonth() && new Date().getFullYear() === date.getFullYear()) {
                                        classes.push(styles.current_day);
                                    }

                                    return (
                                        <div className={classes.join(' ')} key={`${day.content}-${index}`}>
                                            {day.content}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.calendar_events}>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;