import { kode_mono } from "../fonts";

export default function About() {
  return (
    <div className="flex flex-col">
      <h2 className={`p-3 text-xl font-bold ${kode_mono.className}`}>À propos de moi</h2>
      <p className="font-open_sans">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati molestias qui modi natus sunt vitae vel, esse eum nemo laboriosam numquam dolores laborum. Dicta nulla aliquid doloremque ipsum magni dolore.</p>
    </div>
  )
}