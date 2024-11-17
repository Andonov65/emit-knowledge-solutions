import axios from "axios";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const ALGOLIA_URL = "https://hn.algolia.com/api/v1";

class HNService {
  private static debounceTimer: NodeJS.Timeout | null = null;

  static async fetchTopStories(): Promise<number[]> {
    const response = await axios.get(`${BASE_URL}/topstories.json`);
    return response.data;
  }

  static async fetchItemDetails(itemId: number): Promise<any> {
    const response = await axios.get(`${BASE_URL}/item/${itemId}.json`);
    return response.data;
  }

  static async searchPosts(query: string): Promise<any[]> {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    return new Promise((resolve) => {
      this.debounceTimer = setTimeout(async () => {
        try {
          const response = await axios.get(`${ALGOLIA_URL}/search`, {
            params: { query, tags: "story" },
          });
          resolve(response.data.hits);
        } catch (error) {
          console.error("Error searching posts:", error);
          resolve([]);
        }
      }, 300);
    });
  }
}

export default HNService;
