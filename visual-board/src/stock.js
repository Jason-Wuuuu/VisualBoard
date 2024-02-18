import axios from "axios";

const API = "http://127.0.0.1:8000";

export async function getStockHistory(ticker, period) {
  const end_point = `${API}/stock/history/${ticker}?period=${period}`;

  const data = axios
    .get(end_point)
    .then((res) => {
      if (res.status === 200) {
        const { data, statistics } = res.data;
        return { data: JSON.parse(data), statistics };
      }
    })
    .catch((e) => console.log(e));

  return data;
}

export async function getStockInfo(ticker) {
  const end_point = `${API}/stock/info/${ticker}`;

  const data = axios
    .get(end_point)
    .then((res) => {
      if (res.status === 200) return res.data;
    })
    .catch((e) => console.log(e));

  return data;
}

export async function getStockCalendar(ticker) {
  const end_point = `${API}/stock/calendar/${ticker}`;

  const data = axios
    .get(end_point)
    .then((res) => {
      if (res.status === 200) return res.data;
    })
    .catch((e) => console.log(e));

  return data;
}

export async function getStockRecommendations(ticker) {
  const end_point = `${API}/stock/recommendations/${ticker}`;

  const data = axios
    .get(end_point)
    .then((res) => {
      if (res.status === 200) return JSON.parse(res.data);
    })
    .catch((e) => console.log(e));

  return data;
}
