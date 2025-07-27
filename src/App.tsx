import { Albums } from "./components/Albums";
import { Comments } from "./components/Comments";
import { Photos } from "./components/Photos";
import { Posts } from "./components/Posts";
import { Todos } from "./components/Todos";
import { Users } from "./components/Users";

export default function App() {
  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">
        Socia
      </h1>
      <Photos/>
      <hr/>
      <Posts/>
      <hr/>
      <Users/>
      <hr/>
      <Comments/>
      <hr/>
      <Albums/>
      <hr/>
      <Todos/>
      <hr/>
    </div>
  )
}