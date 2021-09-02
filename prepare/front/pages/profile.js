import React from "react";
import Head from "next/head";

import AppLayout from "../Components/AppLayout";
import NickNameEditForm from "../Components/NickNameEditForm";
import FollowList from "../Components/FollowList";
import { useSelector } from "react-redux";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={me.Followings}
        />
        <FollowList
          header="팔로워 목록"
          data={me.Followers}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
