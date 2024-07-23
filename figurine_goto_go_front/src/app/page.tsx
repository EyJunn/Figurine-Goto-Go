import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl">Welcome On Figurine Goto Go.</h1>

      <p>You can register <a href="/Register">Here</a> or log in <a href="/Login">Here</a></p>
    </main>
  );
}
