import React, {useState} from "react";
import "tailwindcss/tailwind.css"

export default function Lottery(props) {
    // 当前选中的抽奖者名称，为空字符串时说明当前不是选中状态
    const [selectedName, setSelectedName] = useState("")

    return (
        <div className="flex">
            <div className="w-1/5">
                <h3>等候区</h3>
                <div>{props.data.waitList.filter(name => name !== selectedName).map(name => <div>{name}</div>)}</div>
                <button
                    className="block px-3 py-2 rounded-md bg-red-400 text-white"
                    onClick={() => props.onRestart()}
                >
                    重置
                </button>
            </div>
            <div className="w-3/5">
                <div className="w-4/5 m-auto">
                    {
                        selectedName !== "" ?
                            <div>
                                <span>{selectedName}</span>
                                <span>中奖概率{props.data.luckyList.length}/{props.data.losingList.length + props.data.luckyList.length + 1}</span>
                                <button
                                    onClick={() => {
                                        // 计算当前选手的是否中奖以及需要替换掉谁
                                        const luckyNum = Math.random() * (props.data.losingList.length + props.data.luckyList.filter(item => item !== "").length + 1)
                                        let losingName = selectedName
                                        const luckyList = props.data.luckyList
                                        if (luckyNum < props.data.awardsNum) {
                                            losingName = luckyList[Math.floor(luckyNum)]
                                            luckyList[Math.floor(luckyNum)] = selectedName
                                        }
                                        const losingList = losingName !== "" ? props.data.losingList.concat(losingName) : props.data.losingList
                                        props.onChange(
                                            props.data.waitList.filter(name => name !== selectedName),
                                            luckyList,
                                            losingList
                                        )
                                        setSelectedName("")
                                    }}
                                >
                                    看看幸运指数
                                </button>
                            </div>
                            : <button
                            className="h-16 w-full block rounded-md bg-sky-500 text-white text-2xl"
                                onClick={() => {
                                    // 选出下一位抽奖选手
                                    const randIndex = Math.floor(Math.random() * props.data.waitList.length)
                                    setSelectedName(props.data.waitList[randIndex])
                                }}
                            >
                                抽一下
                            </button>
                    }
                </div>

                <div className="w-4/5 m-auto">
                    {props.data.luckyList.map(name =>
                        <div
                            className="rounded-md bg-white ring-1 ring-slate-200 shadow-sm"
                        >
                            {name !== "" ? name : "虚位以待"}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/5">
                <h3>遗憾离场</h3>
                <div className="">{props.data.losingList.map(name => <div>{name}</div>)}</div>
            </div>
        </div>
    )
}
