import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "../../../utils/cookie";
import jwt from "jsonwebtoken";
import { supabase } from "../../../utils/supabaseClient";

type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

async function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<{
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}> {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };
  return axios
    .post(url, JSON.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

const getPushUser = async (googleUser: GoogleUser) => {
  const { data, error } = await supabase
    .from("test-google-data")
    .select("*")
    .eq("guid", googleUser.id);
  if (error) {
    console.error(error);
    //if error;
    return { error: true, body: error };
  }
  if (data.length) {
    //if user found, returns user data;
    return { found: true, user: data };
  }
  const push = await supabase
    .from("test-google-data")
    .insert({
      guid: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      profile_pic: googleUser.picture,
    })
    .single();
  //if new user, pushes data
  return { found: false };
};

export default async function GoogleOAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code as string;
  console.log(process.env.NODE_ENV);
  const { id_token, access_token } = await getTokens({
    code,
    clientId:
      "441024269077-tdk1dpipt578i2fce0a6mbpfetlaqs6d.apps.googleusercontent.com",
    clientSecret: "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",
    redirectUri: `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://eskella.vercel.app/api/auth/google"
    }`,
  });

  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
  const data = await getPushUser(googleUser);

  const token = jwt.sign(googleUser, "shh");
  cookie(res, "teachme-oauth-user", token, {
    httpOnly: true,
    maxAge: 900000,
    path: "/",
  });

  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.redirect("/get-listed");
}
