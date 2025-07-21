import { Posts } from "./components/Posts";

export default function App() {
  return (
    <div className="p-4 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello Tailwind + React + TypeScript!
      </h1>
      <Posts/>
    </div>
  )
}