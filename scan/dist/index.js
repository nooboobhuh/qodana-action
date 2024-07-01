"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../common/cli.json
var version, checksum;
var init_cli = __esm({
  "../common/cli.json"() {
    version = "2024.1.6";
    checksum = {
      windows_x86_64: "1701c23a4ef7dcfbeb3563a4a3f0d1681bbf25dad34938783d755833fff90276",
      linux_arm64: "8e4f61b30dcebba06923828aef62329acf8f0caa49f2159689dce277c55466bd",
      darwin_arm64: "40aa43ab15f3979a7a506dee18eaa7f57cc1c634a8347fd2cf3096750b082b2e",
      darwin_x86_64: "c2e9bacfb842a3a0890ce81d64d93040dfba996f5cd9df73335ef5448e5c86a6",
      windows_arm64: "0cfb3b9912aafda00ce2d91e8d778f8e5d71e130a7b5c3fbaf71926d0bff7c70",
      linux_x86_64: "6252d97a6e9f674863f3dcc43bb84c48c71db88400c28036738959443591fea4"
    };
  }
});

// ../common/qodana.ts
var qodana_exports = {};
__export(qodana_exports, {
  BRANCH: () => BRANCH,
  COVERAGE_THRESHOLD: () => COVERAGE_THRESHOLD,
  EXECUTABLE: () => EXECUTABLE,
  FAIL_THRESHOLD_OUTPUT: () => FAIL_THRESHOLD_OUTPUT,
  NONE: () => NONE,
  PULL_REQUEST: () => PULL_REQUEST,
  QODANA_LICENSES_JSON: () => QODANA_LICENSES_JSON,
  QODANA_LICENSES_MD: () => QODANA_LICENSES_MD,
  QODANA_OPEN_IN_IDE_NAME: () => QODANA_OPEN_IN_IDE_NAME,
  QODANA_REPORT_URL_NAME: () => QODANA_REPORT_URL_NAME,
  QODANA_SARIF_NAME: () => QODANA_SARIF_NAME,
  QODANA_SHORT_SARIF_NAME: () => QODANA_SHORT_SARIF_NAME,
  QodanaExitCode: () => QodanaExitCode,
  SUPPORTED_ARCHS: () => SUPPORTED_ARCHS,
  SUPPORTED_PLATFORMS: () => SUPPORTED_PLATFORMS,
  VERSION: () => VERSION,
  extractArg: () => extractArg,
  getCoverageFromSarif: () => getCoverageFromSarif,
  getProcessArchName: () => getProcessArchName,
  getProcessPlatformName: () => getProcessPlatformName,
  getQodanaPullArgs: () => getQodanaPullArgs,
  getQodanaScanArgs: () => getQodanaScanArgs,
  getQodanaSha256: () => getQodanaSha256,
  getQodanaSha256MismatchMessage: () => getQodanaSha256MismatchMessage,
  getQodanaUrl: () => getQodanaUrl,
  isExecutionSuccessful: () => isExecutionSuccessful,
  isNativeMode: () => isNativeMode,
  sha256sum: () => sha256sum,
  validateBranchName: () => validateBranchName
});
function getQodanaSha256(arch, platform) {
  switch (`${platform}_${arch}`) {
    case "windows_x86_64":
      return checksum["windows_x86_64"];
    case "windows_arm64":
      return checksum["windows_arm64"];
    case "linux_x86_64":
      return checksum["linux_x86_64"];
    case "linux_arm64":
      return checksum["linux_arm64"];
    default:
      throw new Error(`Qodana CLI does not exist for ${platform}_${arch}`);
  }
}
function getProcessArchName() {
  if (process.platform === "darwin") {
    return "all";
  }
  return process.arch === "x64" ? "x86_64" : "arm64";
}
function getProcessPlatformName() {
  return process.platform === "win32" ? "windows" : process.platform;
}
function getQodanaUrl(arch, platform, nightly = false) {
  if (!SUPPORTED_PLATFORMS.includes(platform)) {
    throw new Error(`Unsupported platform: ${platform}`);
  }
  if (!SUPPORTED_ARCHS.includes(arch)) {
    throw new Error(`Unsupported architecture: ${arch}`);
  }
  const archive = platform === "windows" ? "zip" : "tar.gz";
  const cli_version = nightly ? "nightly" : `v${version}`;
  return `https://github.com/JetBrains/qodana-cli/releases/download/${cli_version}/qodana_${platform}_${arch}.${archive}`;
}
function isExecutionSuccessful(exitCode) {
  return Object.values(QodanaExitCode).includes(exitCode);
}
function extractArg(argShort, argLong, args) {
  let arg = "";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === argShort || args[i] === argLong) {
      arg = args[i + 1];
      break;
    }
  }
  return arg;
}
function isNativeMode(args) {
  return args.includes("--ide");
}
function getQodanaPullArgs(args) {
  const pullArgs = ["pull"];
  const linter = extractArg("-l", "--linter", args);
  if (linter) {
    pullArgs.push("-l", linter);
  }
  const project = extractArg("-i", "--project-dir", args);
  if (project) {
    pullArgs.push("-i", project);
  }
  const config = extractArg("--config", "--config", args);
  if (config) {
    pullArgs.push("--config", config);
  }
  return pullArgs;
}
function getQodanaScanArgs(args, resultsDir, cacheDir) {
  const cliArgs = [
    "scan",
    "--cache-dir",
    cacheDir,
    "--results-dir",
    resultsDir
  ];
  if (!isNativeMode(args)) {
    cliArgs.push("--skip-pull");
  }
  if (args) {
    cliArgs.push(...args);
  }
  return cliArgs;
}
function getCoverageFromSarif(sarifPath) {
  if (import_fs.default.existsSync(sarifPath)) {
    const sarifContents = JSON.parse(
      import_fs.default.readFileSync(sarifPath, { encoding: "utf8" })
    );
    if (sarifContents.runs[0].properties["coverage"]) {
      return {
        totalCoverage: sarifContents.runs[0].properties["coverage"]["totalCoverage"] || 0,
        totalLines: sarifContents.runs[0].properties["coverage"]["totalLines"] || 0,
        totalCoveredLines: sarifContents.runs[0].properties["coverage"]["totalCoveredLines"] || 0,
        freshCoverage: sarifContents.runs[0].properties["coverage"]["freshCoverage"] || 0,
        freshLines: sarifContents.runs[0].properties["coverage"]["freshLines"] || 0,
        freshCoveredLines: sarifContents.runs[0].properties["coverage"]["freshCoveredLines"] || 0
      };
    } else {
      return {
        totalCoverage: 0,
        totalLines: 0,
        totalCoveredLines: 0,
        freshCoverage: 0,
        freshLines: 0,
        freshCoveredLines: 0
      };
    }
  }
  throw new Error(`SARIF file not found: ${sarifPath}`);
}
function sha256sum(file) {
  const hash = (0, import_crypto.createHash)("sha256");
  hash.update(import_fs.default.readFileSync(file));
  return hash.digest("hex");
}
function getQodanaSha256MismatchMessage(expected, actual) {
  return `Downloaded Qodana CLI binary is corrupted. Expected SHA-256 checksum: ${expected}, actual checksum: ${actual}`;
}
function validateBranchName(branchName) {
  const validBranchNameRegex = /^[a-zA-Z0-9/\-_.]+$/;
  if (!validBranchNameRegex.test(branchName)) {
    throw new Error(
      `Invalid branch name: not allowed characters are used: ${branchName}`
    );
  }
  return branchName;
}
var import_crypto, import_fs, SUPPORTED_PLATFORMS, SUPPORTED_ARCHS, FAIL_THRESHOLD_OUTPUT, QODANA_SARIF_NAME, QODANA_SHORT_SARIF_NAME, QODANA_REPORT_URL_NAME, QODANA_OPEN_IN_IDE_NAME, QODANA_LICENSES_MD, QODANA_LICENSES_JSON, EXECUTABLE, VERSION, COVERAGE_THRESHOLD, QodanaExitCode, NONE, BRANCH, PULL_REQUEST;
var init_qodana = __esm({
  "../common/qodana.ts"() {
    "use strict";
    init_cli();
    import_crypto = require("crypto");
    import_fs = __toESM(require("fs"));
    SUPPORTED_PLATFORMS = ["windows", "linux"];
    SUPPORTED_ARCHS = ["x86_64", "arm64"];
    FAIL_THRESHOLD_OUTPUT = "The number of problems exceeds the failThreshold";
    QODANA_SARIF_NAME = "qodana.sarif.json";
    QODANA_SHORT_SARIF_NAME = "qodana-short.sarif.json";
    QODANA_REPORT_URL_NAME = "qodana.cloud";
    QODANA_OPEN_IN_IDE_NAME = "open-in-ide.json";
    QODANA_LICENSES_MD = "thirdPartySoftwareList.md";
    QODANA_LICENSES_JSON = "third-party-libraries.json";
    EXECUTABLE = "qodana";
    VERSION = version;
    COVERAGE_THRESHOLD = 50;
    __name(getQodanaSha256, "getQodanaSha256");
    __name(getProcessArchName, "getProcessArchName");
    __name(getProcessPlatformName, "getProcessPlatformName");
    __name(getQodanaUrl, "getQodanaUrl");
    QodanaExitCode = /* @__PURE__ */ ((QodanaExitCode2) => {
      QodanaExitCode2[QodanaExitCode2["Success"] = 0] = "Success";
      QodanaExitCode2[QodanaExitCode2["FailThreshold"] = 255] = "FailThreshold";
      return QodanaExitCode2;
    })(QodanaExitCode || {});
    __name(isExecutionSuccessful, "isExecutionSuccessful");
    __name(extractArg, "extractArg");
    __name(isNativeMode, "isNativeMode");
    __name(getQodanaPullArgs, "getQodanaPullArgs");
    __name(getQodanaScanArgs, "getQodanaScanArgs");
    NONE = "none";
    BRANCH = "branch";
    PULL_REQUEST = "pull-request";
    __name(getCoverageFromSarif, "getCoverageFromSarif");
    __name(sha256sum, "sha256sum");
    __name(getQodanaSha256MismatchMessage, "getQodanaSha256MismatchMessage");
    __name(validateBranchName, "validateBranchName");
  }
});

// lib/output.js
var require_output = __commonJS({
  "lib/output.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      __name(adopt, "adopt");
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        __name(fulfilled, "fulfilled");
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        __name(rejected, "rejected");
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        __name(step, "step");
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.COMMIT_EMAIL = exports2.COMMIT_USER = void 0;
    exports2.getCoverageStats = getCoverageStats;
    exports2.getReportURL = getReportURL;
    exports2.publishOutput = publishOutput;
    exports2.getSummary = getSummary;
    exports2.getProblemPlural = getProblemPlural;
    exports2.getDepencencyPlural = getDepencencyPlural;
    exports2.prFixesBody = prFixesBody;
    var core2 = __importStar2(require("@actions/core"));
    var fs2 = __importStar2(require("fs"));
    var qodana_12 = (init_qodana(), __toCommonJS(qodana_exports));
    var utils_12 = require_utils();
    var annotations_1 = require_annotations();
    exports2.COMMIT_USER = "qodana-bot";
    exports2.COMMIT_EMAIL = "qodana-support@jetbrains.com";
    var QODANA_CHECK_NAME = "Qodana";
    var UNKNOWN_RULE_ID = "Unknown";
    var SUMMARY_TABLE_HEADER = "| Inspection name | Severity | Problems |";
    var SUMMARY_TABLE_SEP = "| --- | --- | --- |";
    var SUMMARY_MISC = `Contact us at [qodana-support@jetbrains.com](mailto:qodana-support@jetbrains.com)
  - Or via our issue tracker: https://jb.gg/qodana-issue
  - Or share your feedback: https://jb.gg/qodana-discussions`;
    var VIEW_REPORT_OPTIONS = `To be able to view the detailed Qodana report, you can either:
  - Register at [Qodana Cloud](https://qodana.cloud/) and [configure the action](https://github.com/jetbrains/qodana-action#qodana-cloud)
  - Use [GitHub Code Scanning with Qodana](https://github.com/jetbrains/qodana-action#github-code-scanning)
  - Host [Qodana report at GitHub Pages](https://github.com/JetBrains/qodana-action/blob/3a8e25f5caad8d8b01c1435f1ef7b19fe8b039a0/README.md#github-pages)
  - Inspect and use \`qodana.sarif.json\` (see [the Qodana SARIF format](https://www.jetbrains.com/help/qodana/qodana-sarif-output.html#Report+structure) for details)

To get \`*.log\` files or any other Qodana artifacts, run the action with \`upload-result\` option set to \`true\`, 
so that the action will upload the files as the job artifacts:
\`\`\`yaml
      - name: 'Qodana Scan'
        uses: JetBrains/qodana-action@v${qodana_12.VERSION}
        with:
          upload-result: true
\`\`\`
`;
    var SUMMARY_PR_MODE = `\u{1F4A1} Qodana analysis was run in the pull request mode: only the changed files were checked`;
    function wrapToDiffBlock(message) {
      return `\`\`\`diff
${message}
\`\`\``;
    }
    __name(wrapToDiffBlock, "wrapToDiffBlock");
    function getCoverageStats(c, threshold) {
      if (c.totalLines === 0 && c.totalCoveredLines === 0) {
        return "";
      }
      let stats = "";
      if (c.totalLines !== 0) {
        let conclusion = `${c.totalCoverage}% total lines covered`;
        if (c.totalCoverage < threshold) {
          conclusion = `- ${conclusion}`;
        } else {
          conclusion = `+ ${conclusion}`;
        }
        stats += `${conclusion}
${c.totalLines} lines analyzed, ${c.totalCoveredLines} lines covered`;
      }
      if (c.freshLines !== 0) {
        stats += `
! ${c.freshCoverage}% fresh lines covered
${c.freshLines} lines analyzed, ${c.freshCoveredLines} lines covered`;
      }
      return wrapToDiffBlock([
        `@@ Code coverage @@`,
        `${stats}`,
        `# Calculated according to the filters of your coverage tool`
      ].join("\n"));
    }
    __name(getCoverageStats, "getCoverageStats");
    function getReportURL(resultsDir) {
      let reportUrlFile = `${resultsDir}/${qodana_12.QODANA_OPEN_IN_IDE_NAME}`;
      if (fs2.existsSync(reportUrlFile)) {
        const data = JSON.parse(fs2.readFileSync(reportUrlFile, { encoding: "utf8" }));
        if (data && data.cloud && data.cloud.url) {
          return data.cloud.url;
        }
      } else {
        reportUrlFile = `${resultsDir}/${qodana_12.QODANA_REPORT_URL_NAME}`;
        if (fs2.existsSync(reportUrlFile)) {
          return fs2.readFileSync(`${resultsDir}/${qodana_12.QODANA_REPORT_URL_NAME}`, {
            encoding: "utf8"
          });
        }
      }
      return "";
    }
    __name(getReportURL, "getReportURL");
    function publishOutput(failedByThreshold, resultsDir, useAnnotations, postComment, isPrMode, execute) {
      return __awaiter2(this, void 0, void 0, function* () {
        var _a, _b;
        if (!execute) {
          return;
        }
        try {
          const problems = (0, annotations_1.parseSarif)(`${resultsDir}/${qodana_12.QODANA_SARIF_NAME}`);
          const reportUrl = getReportURL(resultsDir);
          const coverageInfo = getCoverageStats((0, qodana_12.getCoverageFromSarif)(`${resultsDir}/${qodana_12.QODANA_SHORT_SARIF_NAME}`), qodana_12.COVERAGE_THRESHOLD);
          let licensesInfo = "";
          let packages = 0;
          const licensesJson = `${resultsDir}/projectStructure/${qodana_12.QODANA_LICENSES_JSON}`;
          if (fs2.existsSync(licensesJson)) {
            const licenses = JSON.parse(fs2.readFileSync(licensesJson, { encoding: "utf8" }));
            if (licenses.length > 0) {
              packages = licenses.length;
              licensesInfo = fs2.readFileSync(`${resultsDir}/projectStructure/${qodana_12.QODANA_LICENSES_MD}`, { encoding: "utf8" });
            }
          }
          const annotations = (_a = problems.annotations) !== null && _a !== void 0 ? _a : [];
          const toolName = (_b = problems.title.split("found by ")[1]) !== null && _b !== void 0 ? _b : QODANA_CHECK_NAME;
          problems.summary = getSummary(toolName, annotations, coverageInfo, packages, licensesInfo, reportUrl, isPrMode);
          yield Promise.all([
            (0, utils_12.putReaction)(utils_12.ANALYSIS_FINISHED_REACTION, utils_12.ANALYSIS_STARTED_REACTION),
            (0, utils_12.postResultsToPRComments)(toolName, problems.summary, postComment),
            core2.summary.addRaw(problems.summary).write(),
            (0, annotations_1.publishAnnotations)(toolName, problems, failedByThreshold, useAnnotations)
          ]);
        } catch (error) {
          core2.warning(`Qodana has problems with publishing results to GitHub \u2013 ${error.message}`);
        }
      });
    }
    __name(publishOutput, "publishOutput");
    function wrapToToggleBlock(header, body) {
      return `<details>
<summary>${header}</summary>

${body}
</details>`;
    }
    __name(wrapToToggleBlock, "wrapToToggleBlock");
    function getViewReportText(reportUrl) {
      if (reportUrl !== "") {
        return `\u2601\uFE0F [View the detailed Qodana report](${reportUrl})`;
      }
      return wrapToToggleBlock("View the detailed Qodana report", VIEW_REPORT_OPTIONS);
    }
    __name(getViewReportText, "getViewReportText");
    function getRowsByLevel(annotations, level) {
      const problems = annotations.reduce((map, e) => {
        var _a, _b, _c;
        return map.set((_a = e.title) !== null && _a !== void 0 ? _a : UNKNOWN_RULE_ID, map.get((_b = e.title) !== null && _b !== void 0 ? _b : UNKNOWN_RULE_ID) !== void 0 ? map.get((_c = e.title) !== null && _c !== void 0 ? _c : UNKNOWN_RULE_ID) + 1 : 1);
      }, /* @__PURE__ */ new Map());
      return Array.from(problems.entries()).sort((a, b) => b[1] - a[1]).map(([title, count]) => `| \`${title}\` | ${level} | ${count} |`).join("\n");
    }
    __name(getRowsByLevel, "getRowsByLevel");
    function getSummary(toolName, annotations, coverageInfo, packages, licensesInfo, reportUrl, prMode) {
      const contactBlock = wrapToToggleBlock("Contact Qodana team", SUMMARY_MISC);
      let licensesBlock = "";
      if (licensesInfo !== "") {
        licensesBlock = wrapToToggleBlock(`Detected ${packages} ${getDepencencyPlural(packages)}`, licensesInfo);
      }
      let prModeBlock = "";
      if (prMode) {
        prModeBlock = SUMMARY_PR_MODE;
      }
      if (reportUrl !== "") {
        const firstToolName = toolName.split(" ")[0];
        toolName = toolName.replace(firstToolName, `[${firstToolName}](${reportUrl})`);
      }
      if (annotations.length === 0) {
        return [
          `# ${toolName}`,
          "",
          "**It seems all right \u{1F44C}**",
          "",
          "No new problems were found according to the checks applied",
          coverageInfo,
          prModeBlock,
          getViewReportText(reportUrl),
          licensesBlock,
          contactBlock
        ].join("\n");
      }
      return [
        `# ${toolName}`,
        "",
        `**${annotations.length} ${getProblemPlural(annotations.length)}** were found`,
        "",
        SUMMARY_TABLE_HEADER,
        SUMMARY_TABLE_SEP,
        [
          getRowsByLevel(annotations.filter((a) => a.annotation_level === annotations_1.ANNOTATION_FAILURE), "\u{1F534} Failure"),
          getRowsByLevel(annotations.filter((a) => a.annotation_level === annotations_1.ANNOTATION_WARNING), "\u{1F536} Warning"),
          getRowsByLevel(annotations.filter((a) => a.annotation_level === annotations_1.ANNOTATION_NOTICE), "\u25FD\uFE0F Notice")
        ].filter((e) => e !== "").join("\n"),
        "",
        coverageInfo,
        prModeBlock,
        getViewReportText(reportUrl),
        licensesBlock,
        contactBlock
      ].join("\n");
    }
    __name(getSummary, "getSummary");
    function getProblemPlural(count) {
      return `new problem${count !== 1 ? "s" : ""}`;
    }
    __name(getProblemPlural, "getProblemPlural");
    function getDepencencyPlural(count) {
      return `dependenc${count !== 1 ? "ies" : "y"}`;
    }
    __name(getDepencencyPlural, "getDepencencyPlural");
    function prFixesBody(jobUrl) {
      return ` \u{1F590} Hey there!

This pull request has been auto-generated by the [Qodana Scan workflow](${jobUrl}) configured in your repository.
It has performed code analysis and applied some suggested fixes to improve your code quality \u{1F9F9}\u2728

> **Warning**
>  It's crucial to review these changes to ensure everything shipshape manually. Please take a moment to examine the changes here. Remember to run your integration tests against this PR to validate the fixes and ensure everything's functioning as expected.

_\u{1F4BB}\u{1F50D} Happy reviewing and testing!
Best,
[Qodana Scan \u{1F916}](https://github.com/marketplace/actions/qodana-scan)_`;
    }
    __name(prFixesBody, "prFixesBody");
  }
});

// lib/annotations.js
var require_annotations = __commonJS({
  "lib/annotations.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      __name(adopt, "adopt");
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        __name(fulfilled, "fulfilled");
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        __name(rejected, "rejected");
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        __name(step, "step");
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ANNOTATION_NOTICE = exports2.ANNOTATION_WARNING = exports2.ANNOTATION_FAILURE = void 0;
    exports2.publishAnnotations = publishAnnotations;
    exports2.parseSarif = parseSarif;
    exports2.getGitHubCheckConclusion = getGitHubCheckConclusion;
    exports2.toAnnotationProperties = toAnnotationProperties;
    var core2 = __importStar2(require("@actions/core"));
    var fs2 = __importStar2(require("fs"));
    var utils_12 = require_utils();
    var output_12 = require_output();
    function getQodanaHelpString() {
      return `This result was published with [Qodana GitHub Action](${(0, utils_12.getWorkflowRunUrl)()})`;
    }
    __name(getQodanaHelpString, "getQodanaHelpString");
    exports2.ANNOTATION_FAILURE = "failure";
    exports2.ANNOTATION_WARNING = "warning";
    exports2.ANNOTATION_NOTICE = "notice";
    var FAILURE_STATUS = "failure";
    var NEUTRAL_STATUS = "neutral";
    var SUCCESS_STATUS = "success";
    var MAX_ANNOTATIONS = 50;
    function publishAnnotations(name, problems, failedByThreshold, execute) {
      return __awaiter2(this, void 0, void 0, function* () {
        if (!execute) {
          return;
        }
        try {
          if (problems.annotations.length >= MAX_ANNOTATIONS) {
            for (let i = 0; i < problems.annotations.length; i += MAX_ANNOTATIONS) {
              yield (0, utils_12.publishGitHubCheck)(failedByThreshold, name, {
                title: problems.title,
                text: getQodanaHelpString(),
                summary: problems.summary,
                annotations: problems.annotations.slice(i, i + MAX_ANNOTATIONS)
              });
            }
          } else {
            yield (0, utils_12.publishGitHubCheck)(failedByThreshold, name, problems);
          }
        } catch (error) {
          core2.info(`Not able to publish annotations with Checks API \u2013 ${error.message}, 
    using limited (10 problems per level) output instead. Check job permissions (checks: write, pull-requests: write needed)`);
          for (const p of problems.annotations) {
            const properties = toAnnotationProperties(p);
            switch (p.annotation_level) {
              case exports2.ANNOTATION_FAILURE:
                core2.error(p.message, properties);
                break;
              case exports2.ANNOTATION_WARNING:
                core2.warning(p.message, properties);
                break;
              default:
                core2.notice(p.message, properties);
            }
          }
        }
      });
    }
    __name(publishAnnotations, "publishAnnotations");
    function parseResult(result, rules) {
      var _a, _b;
      if (!result.locations || result.locations.length === 0 || !result.locations[0].physicalLocation) {
        return null;
      }
      const location = result.locations[0].physicalLocation;
      const region = location.region;
      return {
        message: (_a = result.message.markdown) !== null && _a !== void 0 ? _a : result.message.text,
        title: (_b = rules.get(result.ruleId)) === null || _b === void 0 ? void 0 : _b.shortDescription,
        path: location.artifactLocation.uri,
        start_line: (region === null || region === void 0 ? void 0 : region.startLine) || 0,
        end_line: (region === null || region === void 0 ? void 0 : region.endLine) || (region === null || region === void 0 ? void 0 : region.startLine) || 1,
        start_column: (region === null || region === void 0 ? void 0 : region.startLine) === (region === null || region === void 0 ? void 0 : region.endColumn) ? region === null || region === void 0 ? void 0 : region.startColumn : void 0,
        end_column: (region === null || region === void 0 ? void 0 : region.startLine) === (region === null || region === void 0 ? void 0 : region.endColumn) ? region === null || region === void 0 ? void 0 : region.endColumn : void 0,
        annotation_level: (() => {
          switch (result.level) {
            case "error":
              return exports2.ANNOTATION_FAILURE;
            case "warning":
              return exports2.ANNOTATION_WARNING;
            default:
              return exports2.ANNOTATION_NOTICE;
          }
        })()
      };
    }
    __name(parseResult, "parseResult");
    function parseRules(tool) {
      var _a, _b;
      const rules = /* @__PURE__ */ new Map();
      (_a = tool.driver.rules) === null || _a === void 0 ? void 0 : _a.forEach((rule) => {
        rules.set(rule.id, {
          shortDescription: rule.shortDescription.text,
          fullDescription: rule.fullDescription.markdown || rule.fullDescription.text
        });
      });
      (_b = tool === null || tool === void 0 ? void 0 : tool.extensions) === null || _b === void 0 ? void 0 : _b.forEach((ext) => {
        var _a2;
        (_a2 = ext === null || ext === void 0 ? void 0 : ext.rules) === null || _a2 === void 0 ? void 0 : _a2.forEach((rule) => {
          rules.set(rule.id, {
            shortDescription: rule.shortDescription.text,
            fullDescription: rule.fullDescription.markdown || rule.fullDescription.text
          });
        });
      });
      return rules;
    }
    __name(parseRules, "parseRules");
    function parseSarif(path) {
      var _a;
      const sarif = JSON.parse(fs2.readFileSync(path, { encoding: "utf8" }));
      const run = sarif.runs[0];
      const rules = parseRules(run.tool);
      let title = "No new problems found by ";
      let annotations = [];
      if ((_a = run.results) === null || _a === void 0 ? void 0 : _a.length) {
        title = `${run.results.length} ${(0, output_12.getProblemPlural)(run.results.length)} found by `;
        annotations = run.results.filter((result) => result.baselineState !== "unchanged").map((result) => parseResult(result, rules)).filter((a) => a !== null && a !== void 0);
      }
      const name = run.tool.driver.fullName || "Qodana";
      title += name;
      return {
        title,
        text: getQodanaHelpString(),
        summary: title,
        annotations
      };
    }
    __name(parseSarif, "parseSarif");
    function getGitHubCheckConclusion(annotations, failedByThreshold) {
      if (failedByThreshold) {
        return FAILURE_STATUS;
      }
      const s = new Set(annotations.map((a) => a.annotation_level));
      if (s.has(exports2.ANNOTATION_FAILURE) || s.has(exports2.ANNOTATION_NOTICE) || s.has(exports2.ANNOTATION_WARNING)) {
        return NEUTRAL_STATUS;
      }
      return SUCCESS_STATUS;
    }
    __name(getGitHubCheckConclusion, "getGitHubCheckConclusion");
    function toAnnotationProperties(a) {
      return {
        title: a.title,
        file: a.path,
        startLine: a.start_line || 0,
        endLine: a.end_line || 1,
        startColumn: a.start_column,
        endColumn: a.end_column
      };
    }
    __name(toAnnotationProperties, "toAnnotationProperties");
  }
});

// lib/utils.js
var require_utils = __commonJS({
  "lib/utils.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var __awaiter2 = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      __name(adopt, "adopt");
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        __name(fulfilled, "fulfilled");
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        __name(rejected, "rejected");
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        __name(step, "step");
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ANALYSIS_STARTED_REACTION = exports2.ANALYSIS_FINISHED_REACTION = void 0;
    exports2.getInputs = getInputs;
    exports2.qodana = qodana;
    exports2.pushQuickFixes = pushQuickFixes;
    exports2.prepareAgent = prepareAgent;
    exports2.uploadArtifacts = uploadArtifacts;
    exports2.uploadCaches = uploadCaches;
    exports2.restoreCaches = restoreCaches;
    exports2.isNeedToUploadCache = isNeedToUploadCache;
    exports2.getWorkflowRunUrl = getWorkflowRunUrl;
    exports2.postResultsToPRComments = postResultsToPRComments;
    exports2.findCommentByTag = findCommentByTag;
    exports2.createComment = createComment;
    exports2.updateComment = updateComment;
    exports2.putReaction = putReaction;
    exports2.publishGitHubCheck = publishGitHubCheck;
    var cache = __importStar2(require("@actions/cache"));
    var core2 = __importStar2(require("@actions/core"));
    var exec = __importStar2(require("@actions/exec"));
    var github2 = __importStar2(require("@actions/github"));
    var glob = __importStar2(require("@actions/glob"));
    var tc = __importStar2(require("@actions/tool-cache"));
    var artifact_1 = __importDefault(require("@actions/artifact"));
    var annotations_1 = require_annotations();
    var qodana_12 = (init_qodana(), __toCommonJS(qodana_exports));
    var path_1 = __importDefault(require("path"));
    var fs2 = __importStar2(require("fs"));
    var os = __importStar2(require("os"));
    var output_12 = require_output();
    exports2.ANALYSIS_FINISHED_REACTION = "+1";
    exports2.ANALYSIS_STARTED_REACTION = "eyes";
    function getInputs() {
      return {
        args: core2.getInput("args").split(",").map((arg) => arg.trim()),
        resultsDir: core2.getInput("results-dir"),
        cacheDir: core2.getInput("cache-dir"),
        primaryCacheKey: core2.getInput("primary-cache-key"),
        additionalCacheKey: core2.getInput("additional-cache-key"),
        cacheDefaultBranchOnly: core2.getBooleanInput("cache-default-branch-only"),
        uploadResult: core2.getBooleanInput("upload-result"),
        uploadSarif: false,
        // not used by the action
        artifactName: core2.getInput("artifact-name"),
        useCaches: core2.getBooleanInput("use-caches"),
        useAnnotations: core2.getBooleanInput("use-annotations"),
        prMode: core2.getBooleanInput("pr-mode"),
        postComment: core2.getBooleanInput("post-pr-comment"),
        githubToken: core2.getInput("github-token"),
        pushFixes: core2.getInput("push-fixes"),
        commitMessage: core2.getInput("commit-message"),
        useNightly: core2.getBooleanInput("use-nightly")
      };
    }
    __name(getInputs, "getInputs");
    function getPrSha() {
      if (process.env.QODANA_PR_SHA) {
        return process.env.QODANA_PR_SHA;
      }
      if (github2.context.payload.pull_request !== void 0) {
        return github2.context.payload.pull_request.base.sha;
      }
      return "";
    }
    __name(getPrSha, "getPrSha");
    function qodana(inputs_1) {
      return __awaiter2(this, arguments, void 0, function* (inputs, args = []) {
        if (args.length === 0) {
          args = (0, qodana_12.getQodanaScanArgs)(inputs.args, inputs.resultsDir, inputs.cacheDir);
          if (inputs.prMode) {
            const sha = getPrSha();
            if (sha !== "") {
              args.push("--commit", sha);
            }
          }
        }
        return (yield exec.getExecOutput(qodana_12.EXECUTABLE, args, {
          ignoreReturnCode: true,
          env: Object.assign(Object.assign({}, process.env), { NONINTERACTIVE: "1" })
        })).exitCode;
      });
    }
    __name(qodana, "qodana");
    function pushQuickFixes(mode, commitMessage) {
      return __awaiter2(this, void 0, void 0, function* () {
        var _a;
        if (mode === qodana_12.NONE) {
          return;
        }
        const c = github2.context;
        let currentBranch = c.ref;
        if (((_a = c.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.ref) !== void 0) {
          currentBranch = c.payload.pull_request.head.ref;
        }
        currentBranch = (0, qodana_12.validateBranchName)(currentBranch);
        yield git(["config", "user.name", output_12.COMMIT_USER]);
        yield git(["config", "user.email", output_12.COMMIT_EMAIL]);
        yield git(["add", "."]);
        const exitCode = yield git(["commit", "-m", commitMessage], {
          ignoreReturnCode: true
        });
        if (exitCode !== 0) {
          return;
        }
        yield git(["pull", "--rebase", "origin", currentBranch]);
        if (mode === qodana_12.BRANCH) {
          yield git(["push", "origin", currentBranch]);
        } else if (mode === qodana_12.PULL_REQUEST) {
          const newBranch = `qodana/quick-fixes-${c.runId}`;
          yield git(["checkout", "-b", newBranch]);
          yield git(["push", "origin", newBranch]);
          yield createPr(commitMessage, `${c.repo.owner}/${c.repo.repo}`, currentBranch, newBranch);
        }
      });
    }
    __name(pushQuickFixes, "pushQuickFixes");
    function prepareAgent(args_1) {
      return __awaiter2(this, arguments, void 0, function* (args, useNightly = false) {
        const arch = (0, qodana_12.getProcessArchName)();
        const platform = (0, qodana_12.getProcessPlatformName)();
        const temp = yield tc.downloadTool((0, qodana_12.getQodanaUrl)(arch, platform, useNightly));
        if (!useNightly) {
          const expectedChecksum = (0, qodana_12.getQodanaSha256)(arch, platform);
          const actualChecksum = (0, qodana_12.sha256sum)(temp);
          if (expectedChecksum !== actualChecksum) {
            core2.setFailed((0, qodana_12.getQodanaSha256MismatchMessage)(expectedChecksum, actualChecksum));
          }
        }
        let extractRoot;
        if (process.platform === "win32") {
          extractRoot = yield tc.extractZip(temp);
        } else {
          extractRoot = yield tc.extractTar(temp);
        }
        core2.addPath(yield tc.cacheDir(extractRoot, qodana_12.EXECUTABLE, useNightly ? "nightly" : qodana_12.VERSION));
        if (!(0, qodana_12.isNativeMode)(args)) {
          const exitCode = yield qodana(getInputs(), (0, qodana_12.getQodanaPullArgs)(args));
          if (exitCode !== 0) {
            core2.setFailed(`qodana pull failed with exit code ${exitCode}`);
            return;
          }
        }
      });
    }
    __name(prepareAgent, "prepareAgent");
    function uploadArtifacts(resultsDir, artifactName, execute) {
      return __awaiter2(this, void 0, void 0, function* () {
        if (!execute) {
          return;
        }
        try {
          core2.info("Uploading artifacts...");
          const locations = [
            `${resultsDir}/*`,
            `${resultsDir}/log/*`,
            `${resultsDir}/report/*`,
            `${resultsDir}/projectStructure/*`
          ];
          const globber = yield glob.create(locations.join("\n"));
          const files = yield globber.glob();
          yield artifact_1.default.uploadArtifact(artifactName, files, path_1.default.dirname(resultsDir));
        } catch (error) {
          core2.warning(`Failed to upload report \u2013 ${error.message}`);
        }
      });
    }
    __name(uploadArtifacts, "uploadArtifacts");
    function uploadCaches(cacheDir, primaryKey, reservedCacheKey, execute) {
      return __awaiter2(this, void 0, void 0, function* () {
        if (!execute) {
          return;
        }
        if (primaryKey === reservedCacheKey) {
          core2.info(`Cache with key ${primaryKey} already exists, skipping cache uploading...`);
          return;
        }
        try {
          yield cache.saveCache([cacheDir], primaryKey);
        } catch (error) {
          const errorMessage = error.message;
          if (errorMessage.includes("Cache already exists.")) {
            core2.info(`Cache with key ${primaryKey} already exists, skipping cache uploading...`);
          } else {
            core2.warning(`Failed to upload caches \u2013 ${errorMessage}`);
          }
        }
      });
    }
    __name(uploadCaches, "uploadCaches");
    function restoreCaches(cacheDir, primaryKey, additionalCacheKey, execute) {
      return __awaiter2(this, void 0, void 0, function* () {
        if (!execute) {
          return "";
        }
        const restoreKeys = [additionalCacheKey];
        try {
          const cacheKey = yield cache.restoreCache([cacheDir], primaryKey, restoreKeys);
          if (!cacheKey) {
            core2.info(`No cache found for input keys: ${[primaryKey, ...restoreKeys].join(", ")}.
          With cache the pipeline would be faster.`);
            return "";
          }
          return cacheKey;
        } catch (error) {
          core2.warning(`Failed to restore cache with key ${primaryKey} \u2013 ${error.message}`);
        }
        return "";
      });
    }
    __name(restoreCaches, "restoreCaches");
    function isNeedToUploadCache(useCaches, cacheDefaultBranchOnly) {
      var _a;
      if (!useCaches && cacheDefaultBranchOnly) {
        core2.warning('Turn on "use-cache" option to use "cache-default-branch-only"');
      }
      if (useCaches && cacheDefaultBranchOnly) {
        const currentBranch = github2.context.payload.ref;
        const defaultBranch = (_a = github2.context.payload.repository) === null || _a === void 0 ? void 0 : _a.default_branch;
        core2.debug(`Current branch: ${currentBranch} | Default branch: ${defaultBranch}`);
        return currentBranch === defaultBranch;
      }
      return useCaches;
    }
    __name(isNeedToUploadCache, "isNeedToUploadCache");
    function getWorkflowRunUrl() {
      if (!process.env["GITHUB_REPOSITORY"]) {
        return "";
      }
      const runId = github2.context.runId;
      const repo = github2.context.repo;
      const serverUrl = process.env["GITHUB_SERVER_URL"] || "https://github.com";
      return `${serverUrl}/${repo.owner}/${repo.repo}/actions/runs/${runId}`;
    }
    __name(getWorkflowRunUrl, "getWorkflowRunUrl");
    function postResultsToPRComments(toolName, content, postComment) {
      return __awaiter2(this, void 0, void 0, function* () {
        var _a;
        const pr = (_a = github2.context.payload.pull_request) !== null && _a !== void 0 ? _a : "";
        if (!postComment || !pr) {
          return;
        }
        const comment_tag_pattern = `<!-- JetBrains/qodana-action@v${qodana_12.VERSION} : ${toolName} -->`;
        const body = `${content}
${comment_tag_pattern}`;
        const client = github2.getOctokit(getInputs().githubToken);
        const comment_id = yield findCommentByTag(client, comment_tag_pattern);
        if (comment_id !== -1) {
          yield updateComment(client, comment_id, body);
        } else {
          yield createComment(client, body);
        }
      });
    }
    __name(postResultsToPRComments, "postResultsToPRComments");
    function findCommentByTag(client, tag) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const { data: comments } = yield client.rest.issues.listComments(Object.assign(Object.assign({}, github2.context.repo), { issue_number: github2.context.issue.number }));
          const comment = comments.find((c) => {
            var _a;
            return (_a = c === null || c === void 0 ? void 0 : c.body) === null || _a === void 0 ? void 0 : _a.includes(tag);
          });
          return comment ? comment.id : -1;
        } catch (error) {
          core2.debug(`Failed to find comment by tag \u2013 ${error.message}`);
          return -1;
        }
      });
    }
    __name(findCommentByTag, "findCommentByTag");
    function createComment(client, body) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          yield client.rest.issues.createComment({
            owner: github2.context.repo.owner,
            repo: github2.context.repo.repo,
            issue_number: github2.context.issue.number,
            body
          });
        } catch (error) {
          core2.debug(`Failed to post comment \u2013 ${error.message}`);
        }
      });
    }
    __name(createComment, "createComment");
    function updateComment(client, comment_id, body) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          yield client.rest.issues.updateComment({
            owner: github2.context.repo.owner,
            repo: github2.context.repo.repo,
            comment_id,
            body
          });
        } catch (error) {
          core2.debug(`Failed to update comment \u2013 ${error.message}`);
        }
      });
    }
    __name(updateComment, "updateComment");
    function putReaction(newReaction, oldReaction) {
      return __awaiter2(this, void 0, void 0, function* () {
        var _a;
        const client = github2.getOctokit(getInputs().githubToken);
        const issue_number = (_a = github2.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number;
        if (oldReaction !== "") {
          try {
            const { data: reactions } = yield client.rest.reactions.listForIssue(Object.assign(Object.assign({}, github2.context.repo), { issue_number }));
            const previousReaction = reactions.find((r) => r.content === oldReaction);
            if (previousReaction) {
              yield client.rest.reactions.deleteForIssue(Object.assign(Object.assign({}, github2.context.repo), { issue_number, reaction_id: previousReaction.id }));
            }
          } catch (error) {
            core2.debug(`Failed to delete the initial reaction \u2013 ${error.message}`);
          }
        }
        try {
          yield client.rest.reactions.createForIssue(Object.assign(Object.assign({}, github2.context.repo), { issue_number, content: newReaction }));
        } catch (error) {
          core2.debug(`Failed to set reaction \u2013 ${error.message}`);
        }
      });
    }
    __name(putReaction, "putReaction");
    function publishGitHubCheck(failedByThreshold, name, output) {
      return __awaiter2(this, void 0, void 0, function* () {
        const conclusion = (0, annotations_1.getGitHubCheckConclusion)(output.annotations, failedByThreshold);
        let sha = github2.context.sha;
        if (github2.context.payload.pull_request) {
          sha = github2.context.payload.pull_request.head.sha;
        }
        const client = github2.getOctokit(getInputs().githubToken);
        const result = yield client.rest.checks.listForRef(Object.assign(Object.assign({}, github2.context.repo), { ref: sha }));
        const checkExists = result.data.check_runs.find((check) => check.name === name);
        if (checkExists) {
          yield updateCheck(client, conclusion, checkExists.id, output);
        } else {
          yield createCheck(client, conclusion, sha, name, output);
        }
      });
    }
    __name(publishGitHubCheck, "publishGitHubCheck");
    function createCheck(client, conclusion, head_sha, name, output) {
      return __awaiter2(this, void 0, void 0, function* () {
        yield client.rest.checks.create(Object.assign(Object.assign({}, github2.context.repo), {
          accept: "application/vnd.github.v3+json",
          status: "completed",
          head_sha,
          conclusion,
          name,
          output
        }));
      });
    }
    __name(createCheck, "createCheck");
    function updateCheck(client, conclusion, check_run_id, output) {
      return __awaiter2(this, void 0, void 0, function* () {
        yield client.rest.checks.update(Object.assign(Object.assign({}, github2.context.repo), {
          accept: "application/vnd.github.v3+json",
          status: "completed",
          conclusion,
          check_run_id,
          output
        }));
      });
    }
    __name(updateCheck, "updateCheck");
    function git(args_1) {
      return __awaiter2(this, arguments, void 0, function* (args, options = {}) {
        return (yield exec.getExecOutput("git", args, options)).exitCode;
      });
    }
    __name(git, "git");
    function createPr(title, repo, base, head) {
      return __awaiter2(this, void 0, void 0, function* () {
        const prBodyFile = path_1.default.join(os.tmpdir(), "pr-body.txt");
        fs2.writeFileSync(prBodyFile, (0, output_12.prFixesBody)(getWorkflowRunUrl()));
        yield exec.getExecOutput("gh", [
          "pr",
          "create",
          "--repo",
          repo,
          "--title",
          title,
          "--body-file",
          prBodyFile,
          "--base",
          base,
          "--head",
          head
        ], {
          env: Object.assign(Object.assign({}, process.env), { GH_TOKEN: getInputs().githubToken })
        });
      });
    }
    __name(createPr, "createPr");
  }
});

// lib/main.js
var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return m[k];
    }, "get") };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = exports && exports.__importStar || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var github = __importStar(require("@actions/github"));
var io = __importStar(require("@actions/io"));
var qodana_1 = (init_qodana(), __toCommonJS(qodana_exports));
var utils_1 = require_utils();
var output_1 = require_output();
process.on("uncaughtException", (e) => core.warning(e.message));
function setFailed(message) {
  core.setFailed(message);
}
__name(setFailed, "setFailed");
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const inputs = (0, utils_1.getInputs)();
      if (inputs.pushFixes !== qodana_1.NONE && inputs.prMode && github.context.payload.pull_request !== void 0) {
        inputs.pushFixes = qodana_1.NONE;
        core.warning(`push-fixes is currently not supported with pr-mode: true in pull requests. Running Qodana with push-fixes: ${inputs.pushFixes}.`);
      }
      yield io.mkdirP(inputs.resultsDir);
      yield io.mkdirP(inputs.cacheDir);
      const restoreCachesPromise = (0, utils_1.restoreCaches)(inputs.cacheDir, inputs.primaryCacheKey, inputs.additionalCacheKey, inputs.useCaches);
      yield Promise.all([
        (0, utils_1.putReaction)(utils_1.ANALYSIS_STARTED_REACTION, utils_1.ANALYSIS_FINISHED_REACTION),
        (0, utils_1.prepareAgent)(inputs.args, inputs.useNightly),
        restoreCachesPromise
      ]);
      const reservedCacheKey = yield restoreCachesPromise;
      const exitCode = yield (0, utils_1.qodana)(inputs);
      const canUploadCache = (0, utils_1.isNeedToUploadCache)(inputs.useCaches, inputs.cacheDefaultBranchOnly) && (0, qodana_1.isExecutionSuccessful)(exitCode);
      yield Promise.all([
        (0, utils_1.pushQuickFixes)(inputs.pushFixes, inputs.commitMessage),
        (0, utils_1.uploadArtifacts)(inputs.resultsDir, inputs.artifactName, inputs.uploadResult),
        (0, utils_1.uploadCaches)(inputs.cacheDir, inputs.primaryCacheKey, reservedCacheKey, canUploadCache),
        (0, output_1.publishOutput)(exitCode === qodana_1.QodanaExitCode.FailThreshold, inputs.resultsDir, inputs.useAnnotations, inputs.postComment, inputs.prMode, (0, qodana_1.isExecutionSuccessful)(exitCode))
      ]);
      if (!(0, qodana_1.isExecutionSuccessful)(exitCode)) {
        setFailed(`qodana scan failed with exit code ${exitCode}`);
      } else if (exitCode === qodana_1.QodanaExitCode.FailThreshold) {
        setFailed(qodana_1.FAIL_THRESHOLD_OUTPUT);
      }
    } catch (error) {
      setFailed(error.message);
    }
  });
}
__name(main, "main");
main();
