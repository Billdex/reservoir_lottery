import {useEffect, useState} from 'react'
import "tailwindcss/tailwind.css"
import './App.css'
import Nav from "./components/nav";
import Checkin from "./components/checkin.jsx";
import Lottery from "./components/lottery.jsx";

function App() {
    const localDataKey = "lottery_data"
    const [lotteryData, setLotteryData] = useState(() => JSON.parse(localStorage.getItem(localDataKey)) || {
        name_list: [],
        lucky_list: [],
        awards_num: 1,
        ready: false,
        wait_list: [],
        losing_list: []
    })

    // 抽奖数据变更时保存数据
    useEffect(() => {
        localStorage.setItem(localDataKey, JSON.stringify(lotteryData))
    }, [lotteryData])

    return (
        <div className="App">
            <Nav/>
            <div className="flex justify-center items-center">
                <div className="w-4/5">
                    {lotteryData.ready ?
                        <Lottery
                            data={{
                                awardsNum: lotteryData.awards_num,
                                waitList: lotteryData.wait_list,
                                luckyList: lotteryData.lucky_list,
                                losingList: lotteryData.losing_list,
                            }}
                            onChange={(waitList, luckyList, losingList) => setLotteryData(prev => {
                                return {
                                    ...prev,
                                    lucky_list: luckyList,
                                    wait_list: waitList,
                                    losing_list: losingList,
                                }
                            })}
                            onRestart={() => setLotteryData(prev => {
                                return {
                                    ...prev,
                                    ready: false,
                                }
                            })}
                        /> :
                        <Checkin
                            nameList={lotteryData.name_list}
                            awardsNum={lotteryData.awards_num}
                            onSubmit={(nameList, awardsNum) => {
                                setLotteryData(() => {
                                    return {
                                        name_list: nameList || [],
                                        awards_num: awardsNum,
                                        lucky_list: Array(parseInt(awardsNum)).fill(''),
                                        ready: true,
                                        wait_list: nameList || [],
                                        losing_list: []
                                    }
                                })
                            }}
                            onCancel={() => setLotteryData(prev => {
                                return {
                                    ...prev,
                                    ready: true
                                }
                            })}
                        />
                    }
                </div></div>
        </div>
    )
}

export default App
