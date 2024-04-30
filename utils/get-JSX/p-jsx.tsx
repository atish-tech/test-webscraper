export function PJSX(ps: NodeListOf<HTMLParagraphElement>) {
  const pElement = Array.from(ps).map((p, index) => {
    return (
      <p key={index} id={p.id} className={p.className}>
        {p.innerText || p.innerHTML}
      </p>
    );
  });
  return pElement;
}
