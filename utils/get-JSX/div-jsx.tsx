export function DivJSX(divs:NodeListOf<HTMLDivElement>){
    const divElements = Array.from(divs).map((div, index) => {        
        return (
        <div
            id={div.id}
            key={index}
            className={div.className}
            // style={div.style}
            dangerouslySetInnerHTML={{ __html: div.innerHTML }}
        />
        );

         // return (
        //   <div className={div.className}>
        //     {div.innerText || div.innerHTML}
        //   </div>
        // );
    });
    
    return divElements;
}