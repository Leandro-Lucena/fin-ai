import Image from "next/image";

const GetInTouch = () => {
  return (
    <>
      <a href="https://github.com/Leandro-Lucena/fin-ai" target="_blank">
        <Image src="/github.svg" width={25} height={25} alt="Github" />
      </a>
      <a
        href="https://www.linkedin.com/in/leandro-ribeiro-lucena/"
        target="_blank"
      >
        <Image src="/linkedin.svg" width={25} height={25} alt="Linkedin" />
      </a>
    </>
  );
};

export default GetInTouch;
