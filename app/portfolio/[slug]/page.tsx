import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/portfolio-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MapPin, Clock, ShieldCheck, CheckCircle2, ArrowLeft, MessageSquare, Sparkles, Award } from 'lucide-react';

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Urban Spazio`,
    description: project.metaDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((p) => p.slug !== project.slug);
  const whatsappMsg = encodeURIComponent(
    `Hi Urban Spazio! I am interested in getting a quote for a design similar to "${project.title}" (${project.category}).`
  );

  return (
    <div className="bg-[#0D0D0E] text-stone-100 min-h-screen font-sans">
      <Header />

      {/* Header Banner */}
      <section className="pt-32 pb-12 bg-[#121214] border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Portfolio Projects
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold block mb-2">
                {project.category.replace('-', ' ')} • {project.location}
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight">
                {project.title}
              </h1>
              <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl">
                {project.subtitle}
              </p>
            </div>

            <a
              href={`https://wa.me/919876543210?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-950/50 shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Inquire About This Look
            </a>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER SLIDER (If available) */}
      {project.beforeAfterPair && (
        <section className="py-16 bg-[#121214] border-b border-stone-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <BeforeAfterSlider
              beforeImage={project.beforeAfterPair.before}
              afterImage={project.beforeAfterPair.after}
              beforeLabel={project.beforeAfterPair.beforeLabel}
              afterLabel={project.beforeAfterPair.afterLabel}
              title="Site Transformation Proof"
              subtitle="Drag to compare the raw construction state with the final illuminated signature execution"
              description={project.beforeAfterPair.description}
            />
          </div>
        </section>
      )}

      {/* MAIN PROJECT CONTENT & GALLERY */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Gallery & Details */}
            <div className="lg:col-span-8 space-y-12">
              {/* Gallery Images */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-100 mb-6">
                  Project Gallery
                </h2>
                <div className="space-y-6">
                  {project.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 shadow-xl"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} View ${idx + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 800px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Features List */}
              <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4">
                <h3 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Key Architectural & Design Features
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {project.signatureFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-stone-300">
                      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial if available */}
              {project.testimonial && (
                <div className="bg-stone-900/80 rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
                    Homeowner Review
                  </span>
                  <p className="text-stone-200 text-sm sm:text-base italic leading-relaxed">
                    "{project.testimonial.quote}"
                  </p>
                  <p className="text-xs text-stone-400 font-bold">
                    — {project.testimonial.author}, {project.testimonial.location}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Spec Sheet */}
            <div className="lg:col-span-4 space-y-6">
              {/* Project Brief Box */}
              <div className="bg-stone-900 rounded-3xl p-6 border border-stone-800 space-y-6 sticky top-28">
                <h3 className="text-lg font-serif font-bold text-stone-100 pb-3 border-b border-stone-800">
                  Project Specifications
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-stone-400 uppercase tracking-wider block mb-1">
                      Location & Property
                    </span>
                    <p className="text-stone-200 font-semibold text-sm flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {project.location} ({project.clientType})
                    </p>
                  </div>

                  <div>
                    <span className="text-stone-400 uppercase tracking-wider block mb-1">
                      Execution Timeline
                    </span>
                    <p className="text-stone-200 font-semibold text-sm flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      {project.timeline}
                    </p>
                  </div>

                  {project.homePackageName && (
                    <div>
                      <span className="text-stone-400 uppercase tracking-wider block mb-1">
                        Matched Home Package
                      </span>
                      <p className="text-amber-300 font-semibold text-sm">
                        {project.homePackageName}
                      </p>
                    </div>
                  )}

                  {/* Material Specs */}
                  <div className="pt-4 border-t border-stone-800 space-y-3">
                    <span className="text-stone-400 uppercase tracking-wider block font-bold">
                      Materials & Hardware Brands Used
                    </span>
                    <div className="space-y-2.5">
                      {project.materials.map((mat, idx) => (
                        <div key={idx} className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                          <span className="text-amber-400 font-mono font-bold block text-[11px]">
                            {mat.brand} • {mat.name}
                          </span>
                          <span className="text-stone-300 text-xs block mt-0.5">
                            {mat.detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <MessageSquare className="w-4 h-4 fill-stone-950" />
                    Get Quote for Similar Scope
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      <section className="py-16 bg-[#121214] border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-stone-100 mb-8">
            Explore Related Signature Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((p) => (
              <div key={p.id} className="bg-stone-900 rounded-2xl p-4 border border-stone-800 flex gap-4 items-center">
                <div className="relative w-28 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">{p.category}</span>
                  <h4 className="font-serif font-bold text-stone-100 text-sm">{p.title}</h4>
                  <Link href={`/portfolio/${p.slug}`} className="text-xs text-amber-400 hover:underline mt-1 inline-block">
                    View Project &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton message={`Hi Urban Spazio! I am looking at "${project.title}" and would like to ask some questions.`} />
    </div>
  );
}
