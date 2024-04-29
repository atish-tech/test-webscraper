export  interface webScraperPageDataTypes {
  url: string[];
  resourceType: string[];
  response: { url: string; text: string | null }[];
  initiator: string[];
  headers: string[];
  method: string[];
  postData: string[];
}
