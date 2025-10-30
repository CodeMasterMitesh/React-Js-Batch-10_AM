const handleParentClick = (e) => {
    // e.stopPropagation();
    console.log("Parent Click Event:");
    alert("Parent Div Clicked");
}

const handleChildClick = (e) => {
    // e.stopPropagation();
    console.log("Child Click Event:");
    alert("Child Div Clicked");
}

const handleGrandchildClick = (e) => {
    console.log("Grandchild Click Event:");
    e.stopPropagation();
    alert("Grandchild Div Clicked");
}

export const EventPropogation = () => {
  return (
    <>
        <div onClickCapture={handleParentClick} style={{padding: '50px', border: '2px solid blue'}}>Parent Div
            <div onClickCapture={handleChildClick} style={{padding: '30px', border: '2px solid red'}}>
                Child Div
                <div onClickCapture={handleGrandchildClick} style={{padding: '20px', border: '2px solid green'}}>
                    Grandchild Div
                </div>
            </div>
        </div>
    </>
  );
}