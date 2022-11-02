
export const fetchUserList = async () => {
  const res = await fetch(`https://hipproback.herokuapp.com/api/user/getalluser`);

  const data = await res.json();
  const dataList = data;
  return dataList;
};
