import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTiktok,
  faInstagram,
  faFacebook,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const year = new Date().getFullYear();

  const socialIcons = {
    Tiktok: faTiktok,
    Instagram: faInstagram,
    Facebook: faFacebook,
    Pinterest: faPinterest,
    Youtube: faYoutube,
  };
  const footerList = [
    {
      name: "協助",
      subList: [
        "我的帳戶",
        "商品和尺寸",
        "寄送",
        "付款與發票",
        "我的購買",
        "換貨、退貨和退款",
      ],
    },
    {
      name: "請追隨我們",
      subList: ["Tiktok", "Instagram", "Facebook", "Pinterest", "Youtube"],
    },
    {
      name: "公司",
      subList: ["我們是誰", "辦事處", "商店", "與我們共事"],
    },
    {
      name: "方針",
      subList: ["隱私條款", "購買條件", "COOKIE設置"],
    },
  ];

  return (
    <footer className="w-full mt-auto">
      <div className="container mx-auto border-t">
        <h1 className="mt-3 text-4xl font-bold text-center font-playfair">
          AVELA
        </h1>
        <ul className="flex flex-wrap items-start justify-between py-5">
          {footerList.map((item) => (
            <li key={item.name}>
              <h3 className="font-bold">{item.name}</h3>
              <ul className="mt-3">
                {item.subList.map((subItem) => (
                  <li
                    key={subItem}
                    className="flex items-center gap-2 text-sm cursor-pointer text-grey-dark"
                  >
                    {item.name === "請追隨我們" && (
                      <FontAwesomeIcon icon={socialIcons[subItem]} />
                    )}
                    <p>{subItem}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <p className="p-3 font-bold text-center bg-white font-playfair">
        ©{year} by Yan Yong Cheng
      </p>
    </footer>
  );
}

export default Footer;
