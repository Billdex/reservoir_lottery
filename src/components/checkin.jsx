import React, {useState} from "react";
import "tailwindcss/tailwind.css";

export default function Checkin(props) {
    // 编辑时不保存状态，但数据要可以进行修改，直到提交时才保存, 组件内需要保存一份
    const [nameList, setNameList] = useState(props.nameList || [])
    const [awardsNum, setAwardsNum] = useState(props.awardsNum || 1)


    return (
        <div className="border px-16">
            <div>
                <span className="text-2xl">抽奖名单</span>
                <span className="text-sm text-gray-500">(一行一个)</span>
            </div>
            <textarea
                className="w-4/5 h-64 border"
                style={{
                    resize: "none",
                }}
                value={nameList.join("\n")}
                onChange={e => setNameList(e.target.value.split("\n"))}
            />
            <br/>
            奖项数量
            <select value={awardsNum} onChange={e => setAwardsNum(e.target.value)}>
                {Array(1,2,3,4,5).map(i => <option value={i}>{i}个</option>)}
            </select>
            <div>
                <button
                    className="block px-3 py-2 rounded-md bg-sky-500 text-white"
                    onClick={()=>{
                        props.onSubmit(nameList.filter(name => name.trim() !== ""), awardsNum)
                    }}
                >
                    开始抽奖
                </button>
                {(props.nameList > 0) &&
                    <button
                        className={"block px-3 py-2 rounded-md bg-orange-300 text-white"}
                        onClick={props.onCancel()}
                    >取消
                    </button>
                }
            </div>
        </div>
    )
}