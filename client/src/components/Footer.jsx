const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Inventory Manager. All rights reserved.</p>
        <p>Created by Michael Demchak</p>
      </div>
    </footer>
  );
};

export default Footer;
