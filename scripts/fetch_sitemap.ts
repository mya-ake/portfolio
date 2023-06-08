const request = new Request("https://mya-ake.com/sitemap");
const response = await fetch(request);

console.log(`============================`);
console.log("Result");
console.log(`Status: ${response.status}`);
console.log(`Cache: ${response.headers.get("x-cache")}`);
console.log(`============================`);
