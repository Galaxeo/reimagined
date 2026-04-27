// @ts-nocheck
import "./App.css";

const featuredWorks = [
  {
    title: "The First Tokens Matter",
    subtitle: "Early Confidence Signals for Evaluating LLM Reasoning",
    type: "Research Paper",
    venue: "ICLR 2026 · Workshop on LLM Reasoning",
    tools: ["Multi-agent LLMs", "Token Probability Analysis", "LLM-as-Judge"],
    description:
      "Investigates how token-level log-probabilities from the initial decoding phase can reliably indicate reasoning quality in multi-agent LLM debate systems. Early-generation confidence signals, especially dispersion within the first few tokens, consistently outperform full-sequence statistics.",
    links: [{ label: "OpenReview", href: "https://openreview.net/forum?id=0FOOrwSQ9E" }],
  },
  {
    title: "PapyrusAI",
    subtitle: "Digital Learning Lab",
    type: "Web Application",
    venue: "UC Irvine",
    tools: ["React", "TypeScript", "Python", "AWS"],
    description:
      "Built an analytics dashboard enabling real-time classroom usage insights, with a React frontend and AWS Lambda backend. Currently developing a multi-agent debate pipeline for automated essay scoring, extending the LLM-as-Judge framework from our ICLR paper to evaluate student writing.",
    links: [
      { label: "Project", href: "https://www.genaied.org/papyrusai.html" },
      { label: "GitHub", href: "https://github.com/UCI-DLL/PapyrusAI" },
    ],
  },
  {
    title: "wav2sleep · PyHealth",
    subtitle: "Sleep Stage Classification from Waveforms",
    type: "Open Source",
    venue: "PyHealth · UIUC",
    tools: ["Python", "PyTorch", "PyHealth"],
    description:
      "Implemented wav2sleep into PyHealth, an open-source clinical ML library. wav2sleep is a unified sleep staging model that jointly trains across heterogeneous polysomnography datasets, supporting cardio-respiratory (ECG, PPG, respiratory) and neural (EOG) modalities with variable signal availability at test-time.",
    links: [{ label: "GitHub", href: "https://github.com/Galaxeo/PyHealth-proj" }],
  },
];

function Works() {
  return (
    <div className="works">
      <div className="featuredWorks">
        <p className="featuredWorksHeader">featured works</p>
        <div className="featuredWorksCont">
          {featuredWorks.map((work, i) => (
            <div key={i} className="featuredWorkCard">
              <p className="featuredWorkType">{work.type}</p>
              <p className="featuredWorkTitle">{work.title}</p>
              <p className="featuredWorkSubtitle">{work.subtitle}</p>
              <p className="featuredWorkVenue">{work.venue}</p>
              <p className="featuredWorkDesc">{work.description}</p>
              <div className="featuredWorkTags">
                {work.tools.map((tool, j) => (
                  <span key={j} className="featuredWorkTag">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="workHelpers">
                {work.links.map((link, j) => (
                  <>
                    {j > 0 && (
                      <span key={`dot-${j}`} className="aboutLinkDot">
                        ·
                      </span>
                    )}
                    <a key={j} href={link.href} target="_blank" rel="noreferrer noopener">
                      {link.label}
                    </a>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
        <a className="kbCommissions" href="https://github.com/galaxeo" target="_blank" rel="noreferrer noopener">
          more projects on github →
        </a>
      </div>
    </div>
  );
}

export default Works;
