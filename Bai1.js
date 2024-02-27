import http from "http";
import url from "url";
import querystring from "querystring";

const data = [
  {
    id: "1",
    userName: "A",
    email: "a12@gmail.com",
    address: "HCM",
    age: "60",
  },
  {
    id: "2",
    userName: "S",
    email: "S12@gmail.com",
    address: "Laocai",
    age: "30",
  },
  {
    id: "3",
    userName: "c",
    email: "c12@gmail.com",
    address: "HCM",
    age: "55",
  },
  {
    id: "4",
    userName: "D",
    email: "D12@gmail.com",
    address: "HCM",
    age: "47",
  },
];
const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const path = parsedUrl.pathname;
  const query = querystring.parse(parsedUrl.query);
  if (req.url === "/users/old" && req.method === "GET") {
    const oldUsers = data.filter((data) => data.age >= 50);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(oldUsers));
  } else if (req.url === "/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } else if (req.url === "/users/add-random" && req.method === "GET") {
    const newUser = {
      id: data.length + 1,
      userName: RandomName(),
      email: RandomName() + "@gmail.com",
      address: "HCM",
      age: RandomAge(),
    };
    data.push(newUser);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(newUser));
  } else if (path.startsWith("/users/add") && req.method === "GET") {
    const userName = query.userName;
    const email = query.email;
    const address = query.address;
    const age = parseInt(query.age);

    const newUser = {
      id: IdRandom(),
      userName,
      email,
      address,
      age,
    };
    data.push(newUser);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(newUser));
  } else {
    res.statusCode = 404;
    res.end("Endpoint không tồn tại");
  }
});
function RandomName() {
  const names = ["Hùng", "Huân", "Bảo", "Thái", "Nhi", "Lam"];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

function RandomAge() {
  return Math.floor(Math.random() * 50) + 40;
}
function IdRandom() {
  return Math.floor(Math.random() * 1000) + 1;
}
const port = 4000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe trên cổng ${port}`);
});
