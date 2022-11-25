import React from "react";
import propTypes from "prop-types";
import "./BlogArchive.scss";
import Link from 'next/link';
import { motion } from "framer-motion";

function BlogArchive({ title, author, status, tag, ID }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="BlogArchiveContainer">
      <p className={tag}>{status}</p>
      <a href={`/blogs/read/${ID}`} style={{ textDecoration: "none"}} class="BlogArchiveRouting">
        <div className="BlogArchiveRouting__title">{title}</div>
        <div className="BlogArchiveRouting__author">Written By: {author}</div>
      </a>
      <div className="BlogArchiveRouting__bottomContainer">
        <a href={`/blogs/read/${ID}`} style={{ textDecoration: "none"}} class="BlogArchiveRouting__redirect">
        Read Now
        </a>
      </div>
    </motion.div>
  );
}

BlogArchive.propTypes = {
  content: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

BlogArchive.defaultProps = {
  content: "idk",
};

export default BlogArchive;
