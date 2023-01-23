import React from "react";
import styles from './style.module.scss'

interface Prop {
    children: React.ReactNode
}

const array = (new Array(12)).fill(0)
console.log(array)



export function Layout({children} : Prop){
    return(
        <div className={styles.wrapper}>
            <div className="tw-w-1/12">
                sidebar
            </div>
            <div className="tw-w-11/12 tw-p-5">
                <div className="tw-bg-gray-800 tw-rounded-xl tw-h-full">
                    {array.map((item,index) => (
                        <div>{index}</div>
                    ))}

                </div>
            </div>
        </div>
    )
}