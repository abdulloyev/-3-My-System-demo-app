import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const username = request.cookies.get("username"); // Cookie orqali username olish

  if (pathname === "/" && username) {
    // Agar foydalanuvchi mavjud bo'lsa va u / sahifasiga kirayotgan bo'lsa, /home sahifasiga yo'naltirish
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (pathname !== "/" && !username) {
    // Agar foydalanuvchi mavjud bo'lmasa va u boshqa sahifalarga kirayotgan bo'lsa, / sahifasiga yo'naltirish
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Boshqa hollarda, requestni davom ettirish
  return NextResponse.next();
}

// Middleware qo'llaniladigan yo'llarni belgilash
export const config = {
  matcher: ["/", "/home/:path*"],
};
