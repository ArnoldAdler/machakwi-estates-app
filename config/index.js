//
export const mode = "production";
// modes - production, production_fix, demo, development
///////////////////////
export const isProduction =
  mode == "production" || mode == "production_fix" ? true : false;
export const isDev = mode == "demo" || mode == "development" ? true : false;
///////////////////////
export const NCODIA_API_LINK = isDev
  ? "http://localhost:9999"
  : "https://ncodia-fe400.ew.r.appspot.com";
////////////////////////
export const iNetApi = "https://i-net-app.ew.r.appspot.com";

const firebaseProductionConfig = {
  apiKey: "AIzaSyAelXc2Y05vj5CfqAOd40cFeLqNMFL93Qg",
  authDomain: "machakwi-estates.firebaseapp.com",
  projectId: "machakwi-estates",
  storageBucket: "machakwi-estates.firebasestorage.app",
  messagingSenderId: "840514085254",
  appId: "1:840514085254:web:2f132aeb7367f676d64c07",
};

export const firebaseConfig = firebaseProductionConfig;

const supabaseProductionConfig = {
  supabaseUrl: "https://nzocajlpekhszsjhamud.supabase.co",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56b2NhamxwZWtoc3pzamhhbXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODc0NTQsImV4cCI6MjAzODg2MzQ1NH0.C-86IPhG_MSSrOrFNTVhhBbFy09zVOp6ODDhr0nZQcY",
};

const supabaseDevConfig = {
  supabaseUrl: "http://192.168.1.176:54321",
  supabaseAnonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
};

export const supabaseConfig = isDev
  ? supabaseDevConfig
  : supabaseProductionConfig;
