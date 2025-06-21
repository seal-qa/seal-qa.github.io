import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { RowData } from "@/components/results-table/columns";
import { DataTable } from "@/components/results-table/data-table";
import { columns } from "@/components/results-table/columns";
import { bearCubsLeaderboard } from "@/data/bear_cubs_leaderboard";
import { CollapsibleSection } from "@/components/dropdown-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Home() {
  const parsedData: RowData[] = bearCubsLeaderboard;
  return (
    // Main container
    <div className="w-full h-full flex flex-col items-center justify-baseline px-0 py-2 md:p-8">
      {/* Content Container */}
      <div className="w-full md:max-w-[70%] mx-auto flex flex-col gap-4 md:gap-8 shadow-lg p-6 md:p-8 rounded-lg items-start justify-center pb-8">
        <header className="w-full flex flex-col gap-2 md:gap-4">
          <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
             <Image
                src="/sealqalogo.png"
                alt="SealQA Logo"
                width={350}
                height={100}
                className="w-[64px] md:w-[125px] h-[64px] md:h-[100px]"
              />
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-center">
                SealQA
              </h1>
             
            </div>
            {/* Small tagline text */}
            <p className="text-center text-sm md:text-base text-muted-foreground italic leading-tight">
             Raising the Bar for Reasoning in Search-Augmented Language Models            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 md:gap-4">
            <Button asChild>
              <Link href="https://arxiv.org/abs/2506.01062">Paper</Link>
            </Button>
            <Button asChild>
              <a href="/sealqa_20250611.json.zip" download>Download questions</a>
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

<div className="w-full flex flex-col items-center justify-center gap-4">
  {/* Figure 1 */}
  <Card className="p-4 w-max-w-[360px] flex flex-col items-center justify-center">
    <img src="/fig2.png" alt="Figure 1" style={{ width: 'auto', height: 'auto' }} />
    <p className="mt-2 text-sm text-muted-foreground text-center">
      Figure 1: Test-time scaling does not lead to reliable gains on SealQA questions,
      with performance often plateauing or even declining early.
    </p>
  </Card>

  {/* Figure 2 */}
  <Card className="p-4 w-max-w-[360px] flex flex-col items-center justify-center">
    <img src="/fig1.png" alt="Figure 2" style={{ width: '1000', height: '400' }} />
    <p className="mt-2 text-sm text-muted-foreground text-center">
      Figure 2: Accuracy of LLMs across benchmarks. SealQA poses significant challenges
      to frontier models.
    </p>
  </Card>

  {/* Figure 3 */}
  <Card className="p-4 w-max-w-[360px] flex flex-col items-center justify-center">
    <img src="/fig3.png" alt="Figure 3" style={{ width: '1000', height: '600' }} />
    <p className="mt-2 text-sm text-muted-foreground text-center">
      Figure 3: SEALQA requires intensive reasoning to resolve ambiguity, filter out
      misinformation, or reconcile conflicting evidence.
    </p>
  </Card>
</div>

        {/* <DataTable columns={columns} data={parsedData} /> */}
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold">Example Questions</h2>
          <Card className="p-4 w-max-w-[720px] flex flex-col items-center justify-center">
            <CardContent className="max-w-[720px]">
              <Image src="/example_1.png" alt="Example Question" height={450} width={720} layout="responsive"/>
              <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-2 md:gap-4">
                {/* <p>View trajectories for:</p>
                <Button asChild>
                  <Link href="https://drive.google.com/file/d/1h5OuhmTT5HSE1gvqmXiiTaskVvtDZOJM/view">Computer Use</Link>
                </Button>
                <Button asChild>
                  <Link href="https://www.youtube.com/watch?v=6xMUqsS7jcM">Proxy</Link>
                </Button>
                <Button asChild>
                  <Link href="https://www.youtube.com/watch?v=HAdKKLmlhy4">Operator</Link>
                </Button> */}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <h2 className="text-3xl font-bold">Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/thinh.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Thinh Pham</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/nguyen.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Nguyen Nguyen</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/pratibha.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Pratibha Zunjare</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/weiyuan.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Weiyuan Chen</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/yumin.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Yu-Min Tseng</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <Avatar className="w-48 h-48">
                <AvatarImage src="/tuvu.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold">Tu Vu</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <Card className="p-4 w-max-w-[720px] flex flex-col items-center justify-center">
            <p>Website last updated June 12, 2025</p>
            <p>We want to thank BEARCUBS for the template.</p>
          </Card>
        </div>


      </div>
    </div>
  );
}
