export default function DotPatternUiTestPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #f5f9ff 0%, #f0f3fc 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 py-0">
        <nav className="mx-auto flex h-[60px] w-full max-w-[1880px] items-center justify-between bg-[#f5f9ff]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="h-5 w-9 rounded-[2px] bg-[#002163]" />
              <div className="h-4 w-px bg-[#002163]/40" />
              <div className="text-[18px] tracking-[1.08px] text-[#002163]">
                投放管理平台
              </div>
            </div>
            <div className="flex items-center gap-6 text-[16px] text-[#405580]">
              <span>概览</span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-linear-to-b from-[#354ca6] to-[#7590f9]" />
                智能投放
              </span>
              <span className="text-[18px] font-semibold text-[#17224e]">
                竞价推广
                <span className="ml-2 inline-block h-[3px] w-9 rounded-full bg-[#000000]" />
              </span>
              <span>品牌推广</span>
              <span>报表</span>
              <span>财务</span>
              <span>资产</span>
              <span>工具</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border border-[#d4e1fc] bg-[#f5f8ff] px-2 py-1 text-[12px] text-[#0d0d0d]">
              <span className="rounded-[4px] bg-[#6997f4] px-1.5 py-0.5 text-white">
                NEW
              </span>
              优量汇自动流量优选功能即将上线
            </div>
            <div className="flex items-center gap-2">
              {["✎", "★", "?", "📱"].map((icon) => (
                <div
                  key={icon}
                  className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm text-[#464749]"
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="flex h-10 items-center gap-3 rounded-[20px] border border-[#296bef]/25 bg-[#f3f7fd] px-4">
              <div className="text-[12px] text-[#0d0d0d]">
                腾讯科技有限公司
              </div>
              <div className="rounded bg-[#e4edff] px-1 text-[12px] text-[#898b8f]">
                ID: 283920
              </div>
              <span className="text-[12px] text-[#898b8f]">▼</span>
            </div>
          </div>
        </nav>

        <div className="mx-auto mt-0 w-full max-w-[1880px] rounded-[20px] bg-white px-20 py-12">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-[#f2f4fa] px-4 py-2 text-[17px] font-black italic tracking-[0.35px] text-transparent [background:linear-gradient(90deg,#296bef,#183d89)] [-webkit-background-clip:text]">
              ADQA
            </div>
            <div className="flex items-center gap-3 text-sm text-[#464749]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f6f7]">
                💬
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f6f7]">
                ⏱
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f6f7]">
                🌳
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex w-full max-w-[888px] flex-col items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-20 items-center justify-center rounded bg-[#04369a]/90 text-sm text-white">
                LOGO
              </div>
              <div className="h-7 w-[2px] rounded bg-[#002163]/40" />
              <div className="text-[24px] font-medium text-[#002163]">
                投放管理平台
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-b from-[#6997f4] to-[#94b5f7] text-white">
                AI
              </div>
              <div className="text-[28px] font-semibold text-[#04369a]">
                Agent
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-[#04369a]" />
            </div>

            <div className="mt-8 flex items-center gap-4 text-[24px] font-light text-[#17224e]">
              <div className="h-8 w-8 rounded-full bg-[#bfd3fa]" />
              早上好! 让我们开始今天的工作吧～
            </div>

            <div className="mt-8 w-full rounded-[32px] bg-[#f6f7f8] p-3">
              <div className="rounded-[24px] border border-[#495a7a]/10 bg-white px-6 py-6">
                <div className="flex flex-wrap items-center gap-2 text-[16px] text-[#3e4552]/60">
                  请输入你的投放诉求，@广告资产内容，/常用指令，或使用
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#33373d]/50 text-[10px] text-[#33373d]/60">
                    🔗
                  </span>
                  上传图片/文件
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#49597a]/5 px-3 py-2 text-[12px] text-[#000000]/95">
                      辅助模式
                    </div>
                    <div className="rounded-lg bg-[#49597a]/5 px-3 py-2 text-[12px] text-[#000000]/95">
                      当前账号
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#33373d]/40 text-[#33373d]/60">
                      🔗
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17224e] text-white">
                      ↑
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 w-full text-left text-[14px] text-[#33373d]/60">
              常用提示词示例
            </div>

            <div className="mt-4 grid w-full grid-cols-3 gap-4">
              {[
                ["新建广告", "轻松创建 1~N 个广告项目"],
                ["新建创意", "快速创建 1~N 个广告创意"],
                ["新建广告和创意", "搭建 1~N 个完整的广告和创意"],
                ["批量调整", "批量修改与优化多条广告"],
                ["启停广告", "快速控制一批广告的开启与暂停"],
                ["敬请期待", "更多提示词，敬请期待"],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl bg-[#f2f4fa] px-6 py-4"
                >
                  <div className="text-[14px] font-semibold text-[#262629]/70">
                    {title}
                  </div>
                  <div className="mt-1 text-[14px] text-[#262629]/70">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
