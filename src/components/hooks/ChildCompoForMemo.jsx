import { memo, useRef } from "react";

export const ChildCompoForMemo = memo(() => {
    const count = useRef(0);
    console.log("Child render; ref object:", count);
    return (
        <div>
            <div>{count.current++}</div>
        </div>
    );
}); 

// export default memo(ChildCompoForMemo);