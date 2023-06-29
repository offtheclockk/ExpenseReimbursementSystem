export function getCookie(name: string) {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  if (cookie) {
    console.log(cookie.split("=")[1]);
    return cookie.split("=")[1];
  }
  return null;
};

export function parseJwt(token: any) {
  // Helper function to parse a JWT token
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};