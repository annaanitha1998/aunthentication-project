import {
  Route,
  Routes
} from "react-router-dom";
import Cookies from "universal-cookie";

import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/Home";

function App() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  console.log(token)

  const navigation = [
    {
      name: 'Register',
      href: '/'
    },
    {
      name: 'Login',
      href: '/login'
    },
    {
      name: 'Home',
      href: '/home'
    }
  ];

  const handleLoginOrLogout = () => {
    if (!token) {
      window.location.href = "/login";
    } else {
      cookies.remove("TOKEN", { path: "/" });
      window.location.href = "/";
    }

  }

  return (
    <div className="bg-gray-100">
      <nav className="flex items-center justify-between p-6 lg:px-8 bg-gray-500 mb-3" aria-label="Global">
       
      
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-lg font-semibold leading-6 text-white">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-lg font-semibold leading-6 text-white" onClick={() => handleLoginOrLogout()}>
            {{ token } ? 'Login' : 'Log out'} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>



      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
