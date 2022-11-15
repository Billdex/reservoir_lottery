import React, {useState} from "react";
import "tailwindcss/tailwind.css"

export default function Lottery(props) {
    // 当前选中的抽奖者名称，为空字符串时说明当前不是选中状态
    const [selectedName, setSelectedName] = useState("")
    const luckyCnt = props.data.luckyList.reduce((prev, item) => item !== "" ? prev + 1 : prev, 0)
    const [luckyNum, setLuckyNum] = useState(0)
    const [showLuckyNum, setShowLuckNum] = useState(false)
    return (
        <div className="flex border px-16 bg-gray-50 rounded-xl py-12">
            <div className="w-1/4">
                <div className="flex">
                    <span className="px-4 text-2xl">等候区</span>
                    <button
                        className="px-4 rounded-md bg-red-400 text-white"
                        onClick={() => props.onRestart()}
                    >
                        重置
                    </button>
                </div>
                <div className="my-2 border-2 rounded-md divide-y-2 divide-gray-200">
                    {props.data.waitList.filter(name => name !== selectedName).map(name =>
                        <div className="py-1 px-4">{name}</div>)}
                </div>
            </div>
            <div className="w-2/4">
                <div className="w-10/12 m-auto">
                    {
                        selectedName !== "" ?
                            <div className="h-36 rounded-md border bg-slate-200">
                                <div
                                    className="flex h-2/4 text-2xl justify-center items-center py-2 px-4">{selectedName}</div>
                                <div className="h-1/4">
                                    {showLuckyNum ?
                                        ((luckyNum < props.data.luckyList.length) ?
                                            <div className="text-center text-red-500">{luckyNum} 幸运中签！</div> :
                                            <div className="text-center text-green-500">{luckyNum} 遗憾离场</div>) :
                                        <div
                                            className="text-center text-blue-500">中奖概率 {props.data.luckyList.length} / {props.data.losingList.length + luckyCnt + 1}
                                <span className="h-1/6 text-sm text-gray-500"> (小于奖项数为中签)</span>
                                        </div>
                                    }
                                </div>
                                {showLuckyNum ?
                                    <button
                                        className="h-1/4 w-full border bg-orange-400 mx-auto my-0 rounded-md"
                                        onClick={() => {
                                            setShowLuckNum(false)
                                            setSelectedName("")
                                        }}
                                    >
                                        下一位~
                                    </button> :
                                    <button
                                        className="h-1/4 w-full border bg-red-400 rounded-md"
                                        onClick={() => {
                                            // 计算当前选手的是否中奖以及需要替换掉谁
                                            const randNum = Math.random() * (props.data.losingList.length + props.data.luckyList.filter(item => item !== "").length + 1)
                                            let losingName = selectedName
                                            const luckyList = props.data.luckyList
                                            if (randNum < props.data.awardsNum) {
                                                // 保证在开始阶段只会逐个加入luckyList中
                                                if (luckyCnt < props.data.luckyList.length) {
                                                    losingName = ""
                                                    luckyList[luckyCnt] = selectedName
                                                } else {
                                                    losingName = luckyList[Math.floor(randNum)]
                                                    luckyList[Math.floor(randNum)] = selectedName
                                                }
                                            }
                                            const losingList = losingName !== "" ? props.data.losingList.concat(losingName) : props.data.losingList
                                            props.onChange(
                                                props.data.waitList.filter(name => name !== selectedName),
                                                luckyList,
                                                losingList
                                            )
                                            setLuckyNum(randNum)
                                            setShowLuckNum(true)
                                        }}
                                    >
                                        <span className="text-lg">看看幸运指数</span>
                                    </button>}
                            </div>
                            : <button
                                className="h-36 w-full rounded-md bg-sky-500 text-white text-4xl"
                                onClick={() => {
                                    // 选出下一位抽奖选手
                                    if (props.data.waitList.length > 0) {
                                        const randIndex = Math.floor(Math.random() * props.data.waitList.length)
                                        setSelectedName(props.data.waitList[randIndex])
                                    }
                                }}
                            >
                                {props.data.waitList.length > 0 ? "抽一下" : "抽不动了！"}
                            </button>
                    }
                </div>
                <div
                    className="w-10/12 mx-auto my-5 bg-gray-100 divide-y-2 divide-orange-200 divide-dashed border-2 rounded-md border-orange-200">
                    <div className="flex items-center justify-center py-2 text-3xl">
                        {props.data.waitList.length === 0 ? "中奖者" : "候奖席"}
                    </div>
                    {props.data.luckyList.map(name => {
                            return name !== "" ?
                                <div className="text-center py-2 text-xl text-red-500">
                                    {name}
                                </div> :
                                <div className="text-center py-2 text-gray-400">
                                    虚位以待
                                </div>
                        }
                    )}
                </div>
            </div>
            <div className="w-1/4">
                {props.data.losingList.length > 0 && <div>
                    <h3 className="text-2xl px-4">遗憾离场</h3>
                    <div
                        className="my-2 border-2 rounded-md divide-y-2 divide-gray-200">{props.data.losingList.map(name =>
                        <div className="py-1 px-4">{name}</div>)}</div>
                </div>}
            </div>
        </div>
    )
}
