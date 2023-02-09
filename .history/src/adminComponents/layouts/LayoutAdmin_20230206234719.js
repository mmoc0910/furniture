import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import {
  BsFillFileTextFill,
  BsFillGridFill,
  BsHandbagFill,
  BsPeopleFill,
} from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../clientComponents/components/Logo";
import ReactTooltip from "react-tooltip";
import { FaPager } from "react-icons/fa";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { dateFormat } from "../../helpers/function";
const url = "https://api.cloudinary.com/v1_1/ds32vmzcc/image/upload";
const menus = [
  {
    id: 1,
    url: "/admin/dashboard",
    title: "Dashboard",
    icon: <BsFillGridFill size={"1.5rem"} color="inherit"></BsFillGridFill>,
  },
  {
    id: 2,
    url: "/admin/orders",
    title: "Dơn hàng",
    icon: (
      <BsFillFileTextFill size={"1.5rem"} color="inherit"></BsFillFileTextFill>
    ),
  },
  {
    id: 3,
    url: "/admin/products",
    title: "Sản phẩm",
    icon: <BsHandbagFill size={"1.5rem"} color="inherit"></BsHandbagFill>,
  },
  {
    id: 4,
    url: "/admin/users",
    title: "Người dùng",
    icon: <BsPeopleFill size={"1.5rem"} color="inher"></BsPeopleFill>,
  },
  {
    id: 5,
    url: "/admin/banners",
    title: "Banners",
    icon: <FaPager size={"1.5rem"} color="inher"></FaPager>,
  },
  // {
  //   id: 6,
  //   url: "/admin/discounts",
  //   title: "Giảm giá",
  //   icon: (
  //     <AiOutlinePercentage size={"1.5rem"} color="inher"></AiOutlinePercentage>
  //   ),
  // },
];
const LayoutAdmin = () => {
  return (
    <>
      <div className="flex w-screen h-screen select-none gap-14 flex-nowrap">
        <div className="flex flex-col items-center justify-between px-5 py-10">
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#32776b] text-white font-extrabold text-3xl">
              F
            </div>
            {menus &&
              menus.map((item) => (
                <MenuItem
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  children={item.icon}
                ></MenuItem>
              ))}
          </div>
          <ChatIcon />
        </div>
        <div className="w-full max-w-full pt-10 pb-20 overflow-y-auto pr-14 scroll-smooth">
          <div className="flex items-center justify-between pb-8">
            <Logo color="#32776b" className="text-5xl font-extrabold"></Logo>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1669546629787-64b58583a5f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1896&q=80"
                className="object-cover rounded-lg w-11 h-11"
                alt=""
              />
              <div className="">
                <p className="flex items-center gap-1 font-bold">
                  Mr.DianaVinhPham
                  <span>
                    <AiFillCaretDown color="#8e8d8c"></AiFillCaretDown>
                  </span>
                </p>
                <p className="text-[#8e8d8c]">Owner</p>
              </div>
            </div>
          </div>
          {<Outlet></Outlet>}
        </div>
      </div>
    </>
  );
};

const MenuItem = ({ url, title, children }) => {
  return (
    <>
      <NavLink
        to={url}
        className={({ isActive }) =>
          `w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? "text-white bg-black" : "text-[#9494a8] bg-[#efefef]"
          }`
        }
        data-tip={title}
      >
        {children}
      </NavLink>
      <ReactTooltip
        padding="7px 15px"
        delayShow={100}
        effect="solid"
        place="right"
      />
    </>
  );
};

const ChatIcon = () => {
  const [state, setState] = React.useState(false);
  return (
    <div className="relative">
      {state && <ChatBox />}
      <div
        className={`flex mb-10 items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-all duration-150 ${
          state ? "text-white bg-black" : "text-[#9494a8] bg-[#efefef]"
        }`}
        onClick={() => setState((state) => !state)}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const [searchUsers, setSearchUsers] = React.useState([]);
  const [chatUsers, setChatUsers] = React.useState([]);
  const [user, setUser] = React.useState();
  const colRef = React.useRef(null);
  React.useEffect(() => {
    const colRef = collection(db, "chatUsers");
    const q = query(colRef, orderBy("sendTime", "desc"));
    onSnapshot(q, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc, index) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setChatUsers(data);
      setUser(data[0]);
    });
  }, []);
  const getUser = async (user) => {
    const docRef = doc(db, "chatUsers", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser({ id: docSnap.id, ...docSnap.data() });
      setSearchUsers([]);
      colRef.current.value = "";
    } else {
      await setDoc(doc(db, "chatUsers", user.id), {
        userInfo: {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        lastMessage: "",
        sendTime: 0,
      });
      await setDoc(doc(db, "chats", user.id), {
        messages: [],
      });
      getUser(user);
    }
  };
  return (
    <div className="rounded-lg shadow-chat w-[700px] h-[500px] bg-white absolute bottom-0 left-16 z-50 cursor-default grid grid-cols-7">
      <div className="col-span-3 border-r border-[#e4e4e4] py-3 overflow-hidden">
        <p className="px-3 text-xl font-bold">Chats</p>
        <form
          className="px-3 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (e.target.elements["searchUser"].value) {
              const colRef = collection(db, "users");
              const q = query(
                colRef,
                where(
                  "displayName",
                  ">=",
                  e.target.elements["searchUser"].value
                )
              );
              onSnapshot(q, (snapshot) => {
                let data = [];
                snapshot.docs.forEach((doc, index) => {
                  data.push({ id: doc.id, ...doc.data() });
                });
                setSearchUsers(data);
                console.log(data);
              });
            }
          }}
        >
          <input
            ref={colRef}
            name="searchUser"
            className="px-3 py-1 bg-[#efefef] rounded-full outline-none w-full"
            autoComplete="off"
            placeholder="Tìm kiếm"
          />
        </form>
        <div className="w-full h-full overflow-y-scroll scroll-3">
          {searchUsers.length > 0 &&
            searchUsers.map((user) => (
              <SearchUser
                user={user}
                key={uuidv4()}
                onClick={() => getUser(user)}
              />
            ))}
          {chatUsers.length > 0 &&
            searchUsers.length === 0 &&
            chatUsers.map((item) => (
              <UserChat
                user={item}
                key={uuidv4()}
                onClick={() => setUser(item)}
                active={user.id === item.id ? true : false}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-between col-span-4 overflow-hidden">
        <Chat user={user} />
      </div>
    </div>
  );
};
const Chat = ({ user }) => {
  const [messages, setMessages] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  console.log(files);
  const colRef = React.useRef(null);
  const inputFileRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    scrollRef.current.scroll(0, scrollRef.current.scrollHeight);
  }, [messages]);
  React.useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "chats", user.id), (doc) => {
        setMessages(doc.data()?.messages);
      });
    }
  }, [user]);
  const handleChangeFile = () => {
    const selectedFiles = inputFileRef.current.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setFiles((curFiles) => [...curFiles, ...selectedFilesArray]);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((curImages) => [...curImages, ...imagesArray]);
  };
  const uploadImages = async () => {
    const formData = new FormData();
    let images = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "my_uploads");
      const data = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
      images.push(data.secure_url);
    }
    // console.log(images);
    return images;
  };
  return (
    <>
      <div className="flex items-center w-full px-3 py-3 text-black">
        {user?.userInfo?.photoURL && (
          <img
            src={user?.userInfo?.photoURL}
            alt=""
            className="w-8 h-8 mr-2 rounded-full"
          />
        )}

        <p className="font-bold text-[#32776b]">
          {user?.userInfo?.displayName}
        </p>
        <span className="ml-auto mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#32776b"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#32776b"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <div
        className="h-full px-3 overflow-scroll max-h-[90%] scroll-hidden"
        ref={scrollRef}
      >
        {messages?.length === 0 && (
          <div className="flex items-center justify-center h-full font-semibold">
            Bắt đầu cuộc trò chuyện...
          </div>
        )}
        {messages.length > 0 &&
          messages.map((message) => (
            <Message message={message} key={uuidv4()} />
          ))}
      </div>
      <div className="px-5 py-3">
        <form
          className="flex items-end justify-between w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            if (colRef.current.value) {
              try {
                const chatRef = doc(db, "chats", user.id);
                await updateDoc(chatRef, {
                  messages: arrayUnion({
                    sendAt: dayjs().unix(),
                    message: colRef.current.value,
                    isAdmin: true,
                    dataType: "text",
                  }),
                });
                const chatUserRef = doc(db, "chatUsers", user.id);
                await updateDoc(chatUserRef, {
                  lastMessage: `you: ${colRef.current.value}`,
                  sendTime: dayjs().unix(),
                });
                colRef.current.value = "";
              } catch (err) {
                console.log(err);
              }
            }
            if (files.length > 0) {
              setImages([]);
              const images = await uploadImages();
              try {
                const chatRef = doc(db, "chats", user.id);
                await updateDoc(chatRef, {
                  messages: arrayUnion({
                    sendAt: dayjs().unix(),
                    message: images,
                    isAdmin: true,
                    dataType: "image",
                  }),
                });
                const chatUserRef = doc(db, "chatUsers", user.id);
                await updateDoc(chatUserRef, {
                  lastMessage: `you: đã gửi ${images.length} ảnh`,
                  sendTime: dayjs().unix(),
                });
                colRef.current.value = "";
              } catch (err) {
                console.log(err);
              }
            }
          }}
        >
          <div className=" max-w-[80%] w-full">
            {images.length > 0 && (
              <div className="bg-[#efefef] w-full px-3 pt-3 pb-1 rounded-tl-2xl rounded-tr-2xl flex items-center gap-2">
                {images.length >= 5
                  ? [...images].splice(0, 3).map((img, index) => (
                      <div
                        className="relative rounded-lg w-14 h-14"
                        key={uuidv4()}
                      >
                        <div
                          className="absolute flex items-center justify-center w-5 h-5 bg-white rounded-full cursor-pointer -top-1 -right-1"
                          onClick={() => {
                            setImages((images) =>
                              [...images].filter((item) => item !== img)
                            );
                            setFiles((files) =>
                              [...files].filter((item, i) => i !== index)
                            );
                          }}
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </span>
                        </div>
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    ))
                  : [...images].map((img) => (
                      <div
                        className="relative rounded-lg w-14 h-14"
                        key={uuidv4()}
                      >
                        <div
                          className="absolute flex items-center justify-center w-5 h-5 bg-white rounded-full cursor-pointer -top-1 -right-1"
                          onClick={() =>
                            setImages((images) =>
                              [...images].filter((item) => item !== img)
                            )
                          }
                        >
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </span>
                        </div>
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    ))}
                {images.length > 4 && (
                  <div className="relative rounded-lg w-14 h-14">
                    <div className="absolute rounded-lg bg-[#16191b6c] inset-0 flex justify-center items-center text-white font-bold">
                      <span>+{images.length - 3}</span>
                    </div>
                    <img
                      src={images[3]}
                      alt=""
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            <input
              className={`px-3 py-1 bg-[#efefef] outline-none w-full  ${
                images.length > 0
                  ? "rounded-bl-2xl rounded-br-2xl"
                  : "rounded-2xl"
              }`}
              ref={colRef}
            />
          </div>

          <label htmlFor="image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#32776b"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <input
            type="file"
            className="hidden"
            id="image"
            multiple
            accept="image/*"
            ref={inputFileRef}
            onChange={() => handleChangeFile()}
          />
          <button type="submit">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#32776b"
                className="w-6 h-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
const Message = ({ message }) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      {message.dataType === "text" && (
        <div onClick={() => setShow((show) => !show)}>
          <div
            className={`px-3 leading-tight py-[5px] rounded-lg w-max max-w-[70%] mt-1 break-words ${
              message.isAdmin
                ? "text-white bg-[#32776b] ml-auto"
                : "text-black bg-[#d7d7d6]"
            }`}
          >
            {message.message}
          </div>
          {show && (
            <p className={`text-xs ${message.isAdmin && "text-right"}`}>
              {dateFormat(message.sendAt, "DD-MM-YYYY HH:mm")}
            </p>
          )}
        </div>
      )}
      {message.dataType === "image" && (
        <div className="mb-2" onClick={() => setShow((show) => !show)}>
          <div
            className={`w-[70%] mt-3 grid gap-1 ${
              message.message.length === 1
                ? "grid-cols-1"
                : message.message.length >= 2 && message.message.length <= 3
                ? `grid-cols-${message.message.length}`
                : "grid-cols-3"
            } ${message.isAdmin && "ml-auto"}`}
          >
            {message.message.map((image) => (
              <img
                key={uuidv4()}
                src={image}
                alt=""
                className="w-full h-full col-span-1 rounded-lg max-h-[350px]"
              />
            ))}
          </div>
          {show && (
            <p className={`text-xs ${message.isAdmin ? "text-right" : ""}`}>
              {dateFormat(message.sendAt, "DD-MM-YYYY HH:mm")}
            </p>
          )}
        </div>
      )}
    </>
  );
};
const SearchUser = ({ user, onClick }) => {
  return (
    <div
      className="flex px-3 py-2 items-center hover:bg-[#eeeeee]"
      onClick={onClick}
    >
      <img
        src={user.photoURL}
        alt=""
        className="w-12 h-12 mr-3 rounded-full grow-0 shrink-0"
      />
      <p className="font-semibold">{user.displayName}</p>
    </div>
  );
};
const UserChat = ({ user, onClick, active }) => {
  return (
    <div
      className={`flex px-3 py-2 ${active && "bg-[#eeeeee]"}`}
      onClick={onClick}
    >
      <img
        src={user.userInfo.photoURL}
        alt=""
        className="w-12 h-12 mr-3 rounded-full grow-0 shrink-0"
      />
      <div className="flex flex-col justify-around">
        <p className="font-semibold">{user.userInfo.displayName}</p>
        {user?.lastMessage && (
          <p className="line-clamp-1">{user.lastMessage}</p>
        )}
      </div>
    </div>
  );
};
export default LayoutAdmin;
