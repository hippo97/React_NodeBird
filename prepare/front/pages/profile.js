import React from "react";
import Head from "next/head";

import AppLayout from "../Components/AppLayout";
import NickNameEditForm from "../Components/NickNameEditForm";
import FollowList from "../Components/FollowList";

const Profile = () => {
  const followerList = [
    { nickname: "hippo" },
    { nickname: "바보" },
    { nickname: "nodebird" },
  ];
  const followingList = [
    { nickname: "hippo" },
    { nickname: "바보" },
    { nickname: "nodebird" },
  ];

  return (
    <>
      <Head>
        <title>
          내 프로필 | NodeBird
        </title>
      </Head>
      <AppLayout>
        <NickNameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followerList}
        />
        <FollowList
          header="팔로워 목록"
          data={followingList}
        />
      </AppLayout>
    </>
  );
};

export default Profile;
