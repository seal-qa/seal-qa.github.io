import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SealQADashboard from "@/components/sealqa-dashboard";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-baseline px-0 py-2 md:p-8">
      {/* ──────────────────────── CONTENT CONTAINER ─────────────────────── */}
      <div className="w-full md:max-w-[70%] mx-auto flex flex-col gap-4 md:gap-8 shadow-lg p-6 md:p-8 rounded-lg items-start justify-center pb-8">
        {/* ─────────────── HEADER / HERO ─────────────── */}
        <header className="w-full flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-center">
                SealQA
              </h1>
              <Image
                src="/sealqalogo.png"
                alt="SealQA Logo"
                width={100}
                height={100}
                className="w-[64px] md:w-[100px] h-[64px] md:h-[100px]"
              />
            </div>
            <p className="text-center text-sm md:text-base text-muted-foreground italic leading-tight">
              Raising the Bar for Reasoning in Search‑Augmented Language Models
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 md:gap-4">
            <Button asChild>
              <Link href="https://arxiv.org/abs/2506.01062">Paper</Link>
            </Button>
            <Button asChild>
              <a href="/sealqa_20250611.json.zip" download>
                Download questions
              </a>
            </Button>
            <Button asChild>
              <Link href="https://forms.gle/RbkwQnSvw6njumat9">Submit a question</Link>
            </Button>
            <Button asChild>
              <Link href="https://forms.gle/RbkwQnSvw6njumat9">To be added</Link>
            </Button>
            <Button asChild>
              <Link href="mailto:tuvu@vt.edu">Contact us</Link>
            </Button>
          </div>
        </header>

        <Separator />

        {/* ─────────────── INTRO TEXT ─────────────── */}
        <p className="text-md text-muted-foreground">We introduce SealQA, a new challenge benchmark for evaluating SEarch-Augmented Language models on fact-seeking questions where web search yields conflicting, noisy, or unhelpful results. <br />
        <br />   SealQA comes in three flavors: (1) Seal-0 (main) and (2) Seal-Hard, which assess factual accuracy and reasoning capabilities,
          with Seal-0 focusing on the most challenging questions where chat models (e.g., GPT-4.1) typically achieve near-zero accuracy;
          and (3) LongSeal, which extends SealQA to test long-context, multi-document reasoning in "needle-in-a-haystack" settings.
          Our evaluation reveals critical limitations in current models: 
          Even frontier LLMs perform poorly across all SealQA flavors. On Seal-0, 
          frontier agentic models equipped with tools like o3 and o4-mini achieve only 17.1% and 6.3% accuracy, respectively, 
          at their best reasoning efforts. We find that advanced reasoning models such as 
          DeepSeek-R1-671B and o3-mini are highly vulnerable to noisy search results. Notably, increasing test-time
          compute does not yield reliable gains across o3-mini, o4-mini, and o3, with performance often plateauing or 
          even declining early. Additionally, while recent models are less affected by the "lost-in-the-middle" issue, 
          they still fail to reliably identify relevant documents in LongSeal when faced with numerous distractors.<br />
             <br />
        To facilitate future work, we release SealQA at <a href="https://huggingface.co/datasets/vtllms/sealqa">huggingface.co/datasets/vtllms/SealQA</a>. 🚀</p>

        <Separator />

        {/* ─────────────── FIGURES / TABLES ─────────────── */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          {/* Table 1 */}
          <Card className="p-4 w-max-w-[360px] flex flex-col items-center justify-center">
            <img
              src="/table1.png"
              alt="Table 1"
              style={{ width: "1000px", height: "600px" }}
            />
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Table 1: Accuracy on Seal‑0 and Seal‑Hard. Frontier LLMs face
              significant challenges on SealQA questions. † indicates results
              using ChatGPT’s built‑in search; all other search‑based results
              use FreshPrompt [Vu et al., 2024].
            </p>
          </Card>

          {/* Figure 1 */}
          <Card className="p-4 w-max-w-[360px] flex flex-col items-center justify-center">
            <img src="/fig2.png" alt="Figure 1" />
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Figure 1: Test‑time scaling does not lead to reliable gains on
              SealQA questions, with performance often plateauing or even
              declining early.
            </p>
          </Card>
        </div>

        {/* ─────────────── EXAMPLE QUESTION ─────────────── */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold">Example Questions</h2>
          <figure className="p-4 w-max-w-[720px] flex flex-col items-center justify-center">
            <CardContent className="max-w-[720px]">
              <Image
                src="/example_1.png"
                alt="Example Question"
                height={450}
                width={720}
                layout="responsive"
                className="rounded-lg"
              />
            </CardContent>
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              Figure 4: SealQA questions test a broad range of reasoning skills
              that are often overlooked in existing benchmarks.
            </figcaption>
          </figure>
        </div>

        {/* ─────────────── SEAL‑HARD interactive table ─────────────── */}
<div className="w-full flex flex-col items-center justify-center gap-4">
  <h2 className="text-3xl font-bold"></h2>
  <SealQADashboard />
</div>


        {/* ─────────────── TEAM ─────────────── */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold">Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {[
              { img: "/thinh.png", name: "Thinh Pham" },
              { img: "/nguyen.jpg", name: "Nguyen Nguyen" },
              { img: "/pratibha.png", name: "Pratibha Zunjare" },
              { img: "/weiyuan.png", name: "Weiyuan Chen" },
              { img: "/yumin.png", name: "Yu‑Min Tseng" },
              { img: "/tuvu.png", name: "Tu Vu" },
            ].map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center justify-center gap-4"
              >
                <Avatar className="w-48 h-48">
                  <AvatarImage src={member.img} alt={member.name} />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <p className="text-lg font-bold">{member.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────── FOOTER ─────────────── */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <Card className="p-4 w-max-w-[720px] flex flex-col items-center justify-center">
            <p>Website last updated July 24 2025</p>
            <p>We thank BEARCUBS for the original template.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
