import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function formatMarkdown(md, en, wrap_in_p = true) {
  const REMOVE_CHARS_FROM_LINK = 6;

  let lines = md.split("\n");
  // ---------------------------------------- english
  let deletingText = false;
  for (let i = 0; i < lines.length; i++) {
    if (en) {
      if (
        !lines[i].includes("<en>") &&
        lines[i].slice(0, 4) !== "up::" &&
        lines[i].slice(0, 7) !== "dates::" &&
        deletingText === false
      )
        lines[i] = "";
      if (lines[i][0] === "#") {
        lines[i] =
          lines[i].slice(0, lines[i].indexOf(" ") + 1) +
          lines[i].slice(
            lines[i].indexOf("<en>") + 4,
            lines[i].indexOf("</en>")
          );
      }
      if (deletingText && lines[i].includes("</en>")) {
        deletingText = false;
        lines[i] = lines[i].slice(0, lines[i].indexOf("</en>"));
      }
      if (lines[i].includes("<en>")) {
        if (!lines[i].includes("</en>")) {
          deletingText = true; // it's poorly named, should be false
          lines[i] = lines[i].slice(lines[i].indexOf("<en>") + 4);
        } else {
          lines[i] = lines[i].slice(
            lines[i].indexOf("<en>") + 4,
            lines[i].indexOf("</en>")
          );
        }
      }
    } else {
      if (deletingText === false) {
        if (lines[i].includes("<en>")) {
          deletingText = lines[i].includes("</en>") ? false : true;
          lines[i] = lines[i].slice(0, lines[i].indexOf("<en>"));
        }
      } else {
        if (lines[i].includes("</en>")) {
          deletingText = false;
          lines[i] = lines[i].slice(lines[i].indexOf("</en>") + 5);
        } else {
          lines[i] = "";
        }
      }
    }
    // ------------------------------------------------------------------ tags
    if (lines[i].slice(0, 6) === "tags::") lines[i] = "";
  }
  // ------------------------------------------------------------------- headings
  let jsx = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") continue;
    if (lines[i][0] === "#") {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] !== "#") {
          const HeadingLevel = `h${j}`;
          const headingJsx = (
            <HeadingLevel>
              {formatMarkdown(lines[i].slice(j), false)}
            </HeadingLevel>
          );
          jsx.push(headingJsx);
          break;
        }
      }
    } else {
      // ------------------------------------------------------------------ links
      if (!lines[i].includes("[["))
        // Line doesn't include any link
        jsx.push(wrap_in_p ? <p>{lines[i]}</p> : <>{lines[i]}</>);
      else {
        let textLine = [];
        textLine.push(lines[i].slice(0, lines[i].indexOf("[[")));
        const link = lines[i].slice(
          lines[i].indexOf("[[") + 2,
          lines[i].indexOf("]]")
        );
        const linkTo =
          "/" +
          (link.includes("|")
            ? link
                .slice(0, link.indexOf("|") - REMOVE_CHARS_FROM_LINK)
                .replace(" ", "_")
            : link
                .slice(0, link.length - REMOVE_CHARS_FROM_LINK)
                .replace(" ", "_"));

        textLine.push(
          <Link to={linkTo}>
            {link.includes("|")
              ? link.slice(link.indexOf("|") + 1)
              : link.slice(0, link.length - REMOVE_CHARS_FROM_LINK)}
          </Link>
        );
        textLine.push(
          formatMarkdown(
            lines[i].slice(lines[i].indexOf("]]") + 2),
            false,
            false
          )
        );
        jsx.push(
          wrap_in_p ? (
            <p>
              {textLine.map((x) => (
                <>{x}</>
              ))}
            </p>
          ) : (
            <>
              {textLine.map((x) => (
                <>{x}</>
              ))}
            </>
          )
        );
      }
    }
  }
  return (
    <>
      {jsx.map((line) => (
        <>{line}</>
      ))}
    </>
  );
}

function Page(props) {
  const [md, setMd] = useState([]);

  useEffect(() => {
    const soubor = require("./../files/markdown/" + props.name + ".md");

    fetch(soubor)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        setMd(formatMarkdown(res, props.english));
      });
  }, [props.name, props.english]);

  return <article>{md}</article>;
}

export default Page;
