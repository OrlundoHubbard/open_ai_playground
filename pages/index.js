import styles from "../styles/Home.module.css";

export default function Home() {


  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/openai")
  }
  return (
    <>
      <form>
        <textarea className={styles.textarea} id="summarization"></textarea>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
