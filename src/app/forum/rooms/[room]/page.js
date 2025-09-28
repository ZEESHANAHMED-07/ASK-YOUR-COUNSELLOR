// src/app/forum/rooms/[room]/page.js
import { use } from "react";
import RoomClient from "./RoomClient";

export default function ForumRoomPage({ params }) {
  const { room } = use(params);
  return <RoomClient roomSlug={room} />;
}
