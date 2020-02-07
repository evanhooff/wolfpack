import axios from 'axios';

const getBaseUrl = () => {
  return process.env.VUE_APP_BASEURL;
}

const errorHandling = (error) => {
  return Promise.reject(error.response);
}

axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_TOKEN}`;

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000
});

export default {
  async getWolves() {
    try {
      let url = '/wolves';
      const res = await axiosInstance.get(url);
      const wolves = res.data;
      return wolves;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async getPacks() {
    try {
      let url = '/packs';
      const res = await axiosInstance.get(url);
      const packs = res.data;
      return packs;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async getPack(id) {
    try {
      let url = `/packs/${id}`;
      const res = await axiosInstance.get(url);
      const pack = res.data;
      return pack;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async createWolf(data) {
    try {
      let url = '/wolves';
      const res = await axiosInstance.post(
        url,
        data
      );
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async deleteWolf(wolf) {
    try {
      let url = `/wolves/${wolf.id}`;
      const res = await axiosInstance.delete(url);
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async updateWolf(wolf) {
    try {
      let url = `/wolves/${wolf.id}`;
      const res = await axiosInstance.put(
        url,
        wolf
      );
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async addWolfToPack(wolf) {
    try {
      let url = `/packs/${wolf.packId}/wolf/${wolf.wolfId}`;
      const res = await axiosInstance.post(url);
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async removeWolfFromPack(wolf) {
    try {
      let url = `/packs/${wolf.packId}/wolf/${wolf.wolfId}`;
      const res = await axiosInstance.delete(url);
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async createPack(pack) {
    try {
      let url = '/packs';
      const res = await axiosInstance.post(url, pack);
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async updatePack(pack) {
    try {
      let url = `/packs/${pack.id}`;
      const res = await axiosInstance.put(url, pack);
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  },
  async deletePack(pack) {
    try {
      let url = `/packs/${pack.id}`;
      const res = await axiosInstance.delete(url);
      return res;
    } catch (e) {
      return errorHandling(e);
    }
  }
}