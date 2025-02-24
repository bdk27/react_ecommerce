function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-auto">
      <p className="p-3 font-bold text-center border-t font-playfair">
        ©{year} by Yan Yong Cheng
      </p>
    </footer>
  );
}

export default Footer;
