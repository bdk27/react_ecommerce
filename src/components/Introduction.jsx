import grid1 from "@/assets/images/grid1.jpg";
import grid2 from "@/assets/images/grid2.jpg";
import grid3 from "@/assets/images/grid3.jpg";
import grid4 from "@/assets/images/grid4.jpg";

function Introduction() {
  const gridArr = [grid1, grid2, grid3, grid4];
  return (
    <>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-4">
        {gridArr.map((item, index) => (
          <img src={item} alt={index} key={index} />
        ))}
      </div>
      <div className="w-full mx-auto mt-5 text-center text-md md:text-lg lg:text-xl text-grey-dark">
        <p>AVELA創立之初的願景是為人們生產時尚、優質、能改善生活品質的服裝</p>
        <p>看看我們如何努力為世界各地的每個人帶來精美、精心製作的時尚</p>
      </div>
    </>
  );
}

export default Introduction;
