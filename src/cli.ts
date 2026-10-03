#!/usr/bin/env bun

import { Command } from "commander";
import genDiff from "./index.ts";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .option("-f, --format <type>", "output format", "stylish")
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
