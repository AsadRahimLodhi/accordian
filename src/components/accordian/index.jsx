import { useState } from "react";
import data from "./data";

export default function Accordian() {
  const [select, setSelect] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelect(getCurrentId === select ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(getCurrentId);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(copyMultiple);
  }
  console.log(select, multiple);
  return (
    <>
      <div className="wrapper flex justify-center items-center w-full h-screen flex-col">
        <button
          onClick={() => setEnableMultiSelection(!enableMultiSelection)}
          className="text-white bg-green-800 p-4 m-2 cursor-pointer  hover:bg-lime-950 hover:text-green-500 transition-all duration-1000"
        >
          Enable Multiple Selection
        </button>
        <div className="accordian ">
          {data && data.length ? (
            data.map((dataItem) => (
              <div className="item bg-green-800 w-[500px] m-4 p-4 cursor-pointer transform transition-transform hover:scale-110">
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title bg-slate-500 font-bold text-white "
                >
                  <h3>{dataItem.question}</h3>
                  <span className="transform transition-transform hover:scale-110 ">
                    +
                  </span>
                </div>
                {enableMultiSelection
                  ? multiple.indexOf(dataItem.id) !== -1 && (
                      <div className="content">{dataItem.answer}</div>
                    )
                  : select === dataItem.id && (
                      <div className="">{dataItem.answer}</div>
                    )}
              </div>
            ))
          ) : (
            <div> No Data Found</div>
          )}
        </div>
      </div>
    </>
  );
}
